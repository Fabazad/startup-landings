/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { blogUpsertSchema } from 'src/types/blog';

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
    const parsed = blogUpsertSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { data } = parsed;
    // language is part of the row identity; default it for the lookup and for new posts.
    const language = data.language ?? 'fr';

    const { data: existingBlog, error: findError } = await supabase
      .from('blogs')
      .select('id')
      .eq('product_idea_id', data.product_idea_id)
      .eq('language', language)
      .eq('slug', data.slug)
      .maybeSingle();

    if (findError) {
      console.error('Error finding blog before upsert:', findError);
      return NextResponse.json({ error: findError.message }, { status: 500 });
    }

    // title/content are optional on the schema so an existing post can be patched without resending
    // them, but creating one still needs them (slug + product_idea_id are already required).
    if (!existingBlog && (!data.title || !data.content)) {
      return NextResponse.json(
        { error: 'title and content are required to create a post' },
        { status: 400 }
      );
    }

    // Update: write only the provided fields (no defaults), so a small edit never silently flips
    // published / author / language. Insert: fill the defaults that used to live on the schema.
    const insertPayload = {
      ...data,
      language,
      published: data.published ?? true,
      author: data.author ?? 'AI',
    };
    const query = existingBlog
      ? supabase.from('blogs').update(data).eq('id', existingBlog.id)
      : supabase.from('blogs').insert([insertPayload]);

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
