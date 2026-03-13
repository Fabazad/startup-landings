import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { CONFIG } from 'src/config-global';

const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.adminKey || CONFIG.supabase.key);

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  cover_image: z.string().url().optional().or(z.literal('')),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.array(z.string()).optional(),
  product_idea_id: z.string().min(1, 'Product Idea ID is required'),
  language: z.string().default('fr'),
  published: z.boolean().default(true),
  author: z.string().default('AI'),
});

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split('Bearer ')[1] !== CONFIG.blog.aiSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = blogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload', details: parsed.error.format() }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('blogs')
      .insert([parsed.data])
      .select()
      .single();

    if (error) {
      console.error('Error inserting blog:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, blog: data }, { status: 201 });

  } catch (error: any) {
    console.error('Error in blog publishing:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
