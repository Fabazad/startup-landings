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

    const { data, error } = await supabase
      .from('blogs')
      .upsert(parsed.data, { onConflict: 'product_idea_id,language,slug' })
      .select()
      .single();

    if (error) {
      console.error('Error upserting blog:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, blog: data }, { status: 200 });
  } catch (error: any) {
    console.error('Error in blog upserting:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
