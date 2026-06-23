/* eslint-disable no-console */
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';

const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.adminKey || CONFIG.supabase.key);

// Body is optional:
//   {}                                  -> resurface the post now (content_refreshed_at = now())
//   { "content_refreshed_at": null }    -> un-resurface (drop back to its original position)
//   { "content_refreshed_at": "<ISO>" } -> pin a specific refresh date
// product_idea_id / language scope the target when the same slug exists for several products or
// languages (e.g. fr + en versions). Without them, every row matching the slug is updated.
const refreshSchema = z.object({
  content_refreshed_at: z.string().datetime({ offset: true }).nullable().optional(),
  product_idea_id: z.nativeEnum(PRODUCT_IDEA_NAMES).optional(),
  language: z.string().optional(),
});

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const authHeader = req.headers.get('authorization');

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      authHeader.split('Bearer ')[1] !== CONFIG.blog.aiSecret
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;

    // The body is optional, so tolerate an empty/missing payload.
    let rawBody: unknown = {};
    try {
      rawBody = await req.json();
    } catch {
      rawBody = {};
    }

    const parsed = refreshSchema.safeParse(rawBody ?? {});
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    // Default to now() (resurface). An explicit key — including null — is honored as-is so callers
    // can un-resurface a post or pin a specific refresh date.
    const contentRefreshedAt = Object.prototype.hasOwnProperty.call(
      parsed.data,
      'content_refreshed_at'
    )
      ? parsed.data.content_refreshed_at ?? null
      : new Date().toISOString();

    let query = supabase
      .from('blogs')
      .update({ content_refreshed_at: contentRefreshedAt })
      .eq('slug', slug);

    if (parsed.data.product_idea_id) {
      query = query.eq('product_idea_id', parsed.data.product_idea_id);
    }
    if (parsed.data.language) {
      query = query.eq('language', parsed.data.language);
    }

    // feed_date (generated) and updated_at (trigger) are recomputed by the DB on this update.
    const { data, error } = await query.select();

    if (error) {
      console.error(`Error refreshing blog ${slug}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, count: data.length, blogs: data }, { status: 200 });
  } catch (error: any) {
    console.error(`Error in blog refresh ${params?.slug}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
