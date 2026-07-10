/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { revalidateFront } from 'src/lib/blog-front-revalidate';

const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.adminKey || CONFIG.supabase.key);

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const authHeader = req.headers.get('authorization');

    // Fail closed: with AI_BLOG_SECRET unset, CONFIG.blog.aiSecret is '' and an
    // empty Bearer token would otherwise match — nothing must be unpublishable then.
    if (
      !CONFIG.blog.aiSecret ||
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      authHeader.split('Bearer ')[1] !== CONFIG.blog.aiSecret
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;

    const { data, error } = await supabase
      .from('blogs')
      .update({ published: false })
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error(`Error unpublishing blog ${slug}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Revalidate the front so the unpublished article stops being served.
    const revalidated = await revalidateFront(data.product_idea_id, data.slug);

    return NextResponse.json({ success: true, blog: data, revalidated }, { status: 200 });
  } catch (error: any) {
    console.error(`Error in blog unpublishing ${params?.slug}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
