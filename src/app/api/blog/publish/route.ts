/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { blogDataSchema } from 'src/types/blog';

const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.adminKey || CONFIG.supabase.key);

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      authHeader.split('Bearer ')[1] !== CONFIG.blog.aiSecret
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = blogDataSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { data: existingBlog, error: findError } = await supabase
      .from('blogs')
      .select('id')
      .eq('product_idea_id', parsed.data.product_idea_id)
      .eq('language', parsed.data.language)
      .eq('slug', parsed.data.slug)
      .maybeSingle();

    if (findError) {
      console.error('Error finding blog before upsert:', findError);
      return NextResponse.json({ error: findError.message }, { status: 500 });
    }

    const query = existingBlog
      ? supabase.from('blogs').update(parsed.data).eq('id', existingBlog.id)
      : supabase.from('blogs').insert([parsed.data]);

    const { data: blog, error: upsertError } = await query.select().single();

    if (upsertError) {
      console.error('Error upserting blog:', upsertError);
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, blog }, { status: existingBlog ? 200 : 201 });
  } catch (error: any) {
    console.error('Error in blog upserting:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
