import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductIdea } from 'src/app/getProductIdea';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { detectLanguage } from 'src/locales/server';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { PostListHomeView } from './post-list-home-view';
import { BlogPost } from 'src/types/blog';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getProductIdea();
  return {
    title: `Blog | ${name}`,
    description: `Latest articles and news from ${name}`,
  };
}

export default async function BlogPage() {
  const { id: productIdeaId } = await getProductIdea();
  
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
  
  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const { data: blogs, error } = await supabase
    .from('blogs')
    .select<any, BlogPost>('id, title, slug, excerpt, cover_image, created_at')
    .eq('product_idea_id', productIdeaId)
    .eq('language', lang ?? 'fr')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    notFound();
  }

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" sx={{ mb: 5, textAlign: 'center' }}>
        Blog
      </Typography>

      <PostListHomeView posts={blogs} />
    </Container>
  );
}
