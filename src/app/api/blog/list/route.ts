import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import { CONFIG } from 'src/config-global';
import { getProductIdea } from 'src/app/getProductIdea';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const lang = searchParams.get('lang') || 'fr';

    const { name: productIdeaName } = await getProductIdea();
    const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, cover_image, created_at', { count: 'exact' })
      .eq('product_idea_id', productIdeaName)
      .eq('language', lang)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ blogs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
