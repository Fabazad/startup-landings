import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getProductIdea } from 'src/app/getProductIdea';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { detectLanguage, getServerTranslations } from 'src/locales/server';
import { BlogStructuredData } from 'src/components/seo/blog-structured-data';
import { PostDetailsHomeView } from './post-details-home-view';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { name: productName } = await getProductIdea();

  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const { t } = await getServerTranslations();

  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const { data: blog } = await supabase
    .from('blogs')
    .select('seo_title, seo_description, seo_keywords, title, excerpt, cover_image')
    .eq('product_idea_id', productName)
    .eq('language', lang ?? 'fr')
    .eq('slug', params.slug)
    .single();

  if (!blog) {
    return {
      title: t('blog.meta.notFound'),
      description: t('blog.meta.notFoundDescription'),
    };
  }

  return {
    title: blog.seo_title || `${blog.title} | ${productName}`,
    description:
      blog.seo_description || blog.excerpt || t('blog.meta.readOn', { name: productName }),
    keywords: blog.seo_keywords || [],
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description || blog.excerpt || '',
      images: blog.cover_image ? [{ url: blog.cover_image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { name: productIdeaName } = await getProductIdea();

  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('product_idea_id', productIdeaName)
    .eq('language', lang ?? 'fr')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (error || !blog) {
    notFound();
  }

  return (
    <>
      <BlogStructuredData post={blog} baseUrl={baseUrl} productName={productIdeaName} />
      <PostDetailsHomeView post={blog} latestPosts={[]} />
    </>
  );
}
