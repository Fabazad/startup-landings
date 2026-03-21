/* eslint-disable no-console */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductIdea } from 'src/app/getProductIdea';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { detectLanguage, getServerTranslations } from 'src/locales/server';
import Container from '@mui/material/Container';
import { BlogPost } from 'src/types/blog';
import { PostListHomeView } from './post-list-home-view';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getProductIdea();
  const { t } = await getServerTranslations();

  return {
    title: t('blog.meta.title', { name }),
    description: t('blog.meta.description', { name }),
  };
}

export default async function BlogPage() {
  const { name: productIdeaName } = await getProductIdea();

  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const {
    data: blogs,
    error,
    count,
  } = await supabase
    .from('blogs')
    .select<any, BlogPost>('id, title, slug, excerpt, cover_image, created_at', { count: 'exact' })
    .eq('product_idea_id', productIdeaName)
    .eq('language', lang ?? 'fr')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(0, 6);

  if (error) {
    console.error('Error fetching blogs:', error);
    notFound();
  }

  return (
    <Container sx={{ py: 10 }}>
      {blogs && <PostListHomeView posts={blogs} totalCount={count ?? 0} language={lang ?? 'fr'} />}
    </Container>
  );
}
