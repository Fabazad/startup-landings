import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductIdea } from 'src/app/getProductIdea';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { detectLanguage } from 'src/locales/server';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';
import Box from '@mui/material/Box';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getProductIdea();
  return {
    title: `Blog | ${name}`,
    description: `Latest articles and news from ${name}`,
  };
}

export default async function BlogPage() {
  const { id: productIdeaId, themeColor } = await getProductIdea();
  
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
  
  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('title, slug, excerpt, cover_image, created_at')
    .eq('product_idea_id', productIdeaId)
    .eq('language', lang ?? 'fr')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" sx={{ mb: 5, textAlign: 'center' }}>
        Blog
      </Typography>

      {error ? (
        <Typography color="error">Error loading blogs.</Typography>
      ) : blogs && blogs.length > 0 ? (
        <Grid container spacing={4}>
          {blogs.map((blog) => (
             <Grid key={blog.slug} xs={12} sm={6} md={4}>
               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                 {blog.cover_image && (
                   <CardMedia
                     component="img"
                     height="200"
                     image={blog.cover_image}
                     alt={blog.title}
                   />
                 )}
                 <CardContent sx={{ flexGrow: 1 }}>
                   <Typography gutterBottom variant="h5" component="h2" sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                   }}>
                     <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                       {blog.title}
                     </Link>
                   </Typography>
                   <Typography variant="body2" color="text.secondary" sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                   }}>
                     {blog.excerpt}
                   </Typography>
                 </CardContent>
               </Card>
             </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No articles published yet. Stay tuned!
        </Typography>
      )}
    </Container>
  );
}
