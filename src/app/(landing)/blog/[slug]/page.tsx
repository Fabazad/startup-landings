import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductIdea } from 'src/app/getProductIdea';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { detectLanguage } from 'src/locales/server';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { id: productIdeaId, name: productName } = await getProductIdea();
  
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
  
  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const { data: blog } = await supabase
    .from('blogs')
    .select('seo_title, seo_description, seo_keywords, title, excerpt, cover_image')
    .eq('product_idea_id', productIdeaId)
    .eq('language', lang ?? 'fr')
    .eq('slug', params.slug)
    .single();

  if (!blog) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: blog.seo_title || `${blog.title} | ${productName}`,
    description: blog.seo_description || blog.excerpt || `Read this article on ${productName}`,
    keywords: blog.seo_keywords || [],
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt || '',
      images: blog.cover_image ? [{ url: blog.cover_image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { id: productIdeaId } = await getProductIdea();

  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('product_idea_id', productIdeaId)
    .eq('language', lang ?? 'fr')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (error || !blog) {
    notFound();
  }

  return (
    <Container sx={{ py: 10, maxWidth: 'md' }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Published on {new Date(blog.created_at).toLocaleDateString()}
          {blog.author && ` by ${blog.author}`}
        </Typography>
      </Box>

      {blog.cover_image && (
        <Box sx={{ mb: 5, borderRadius: 2, overflow: 'hidden' }}>
          <img src={blog.cover_image} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
        </Box>
      )}

      <Box
        sx={{
          '& img': { maxWidth: '100%', borderRadius: 1 },
          '& h2': { mt: 4, mb: 2 },
          '& h3': { mt: 3, mb: 2 },
          '& p': { mb: 2, fontSize: '1.1rem', lineHeight: 1.8 },
          '& ul, & ol': { mb: 2, pl: 3, fontSize: '1.1rem', lineHeight: 1.8 },
          '& a': { color: 'primary.main', textDecoration: 'none' },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
      </Box>
    </Container>
  );
}
