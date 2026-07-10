import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { languages } from 'src/locales/config-locales';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { getRawProductIdea } from './getProductIdea';

// Force dynamic generation to ensure correct domain in URLs
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const productIdea = await getRawProductIdea();

  // La langue est résolue par cookie/Accept-Language, pas par l'URL : les
  // variantes ?lang= redirigent (302) vers l'URL propre via le middleware.
  // Le sitemap ne doit donc émettre QUE des URLs propres — une entrée ?lang=
  // finit en « Page avec redirection » dans Search Console.
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Add FAQ pages if the product idea has them
  if (productIdea?.faq?.pages) {
    productIdea.faq.pages.forEach((faqPage) => {
      // Add each language variant of the FAQ page
      languages.forEach((lang) => {
        const slug = faqPage.slug[lang as 'en' | 'fr'] || faqPage.slug.en;
        const faqUrl = `${baseUrl}/faq/${slug}/`;

        // Build alternate language URLs for this FAQ page
        const faqAlternates: Record<string, string> = {};
        languages.forEach((l) => {
          const altSlug = faqPage.slug[l as 'en' | 'fr'] || faqPage.slug.en;
          faqAlternates[l] = `${baseUrl}/faq/${altSlug}/`;
        });

        pages.push({
          url: faqUrl,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
          alternates: {
            languages: faqAlternates,
          },
        });
      });
    });
  }

  // Add blog pages if the product idea has them
  if (productIdea?.name) {
    const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.adminKey);
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, language, updated_at, cover_image')
      .eq('product_idea_id', productIdea.name)
      .eq('published', true);

    if (blogs && blogs.length > 0) {
      // Un slug n'a qu'une seule URL adressable (la langue vient du cookie,
      // pas de l'URL) : une entrée par slug, la plus récente si le slug
      // existe dans plusieurs langues.
      const blogBySlug: Record<string, { updated_at: string; cover_image: string | null }> = {};
      blogs.forEach((blog) => {
        const existing = blogBySlug[blog.slug];
        if (!existing || new Date(blog.updated_at) > new Date(existing.updated_at)) {
          blogBySlug[blog.slug] = {
            updated_at: blog.updated_at,
            cover_image: blog.cover_image ?? existing?.cover_image ?? null,
          };
        }
      });

      Object.entries(blogBySlug).forEach(([slug, blog]) => {
        pages.push({
          url: `${baseUrl}/blog/${slug}/`,
          lastModified: new Date(blog.updated_at || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
          // Sitemap images : aide Google Images à découvrir les couvertures.
          ...(blog.cover_image && { images: [blog.cover_image] }),
        });
      });
    }
  }

  return pages;
}
