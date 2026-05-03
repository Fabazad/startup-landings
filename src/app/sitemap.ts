import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { languages } from 'src/locales/config-locales';
import { createClient } from '@supabase/supabase-js';
import { CONFIG } from 'src/config-global';
import { getRawProductIdea } from './getProductIdea';

// Force dynamic generation to ensure correct domain in URLs
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const productIdea = await getRawProductIdea();

  // Base pages for each language
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(languages.map((lang) => [lang, `${baseUrl}?lang=${lang}`])),
      },
    },
  ];

  // Add language-specific pages
  languages.forEach((lang) => {
    pages.push({
      url: `${baseUrl}?lang=${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(languages.map((l) => [l, `${baseUrl}?lang=${l}`])),
      },
    });
  });

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
    const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, language, updated_at')
      .or(`product_idea_id.eq."${productIdea.name}",product_idea_id.eq."${productIdea.id}"`)
      .eq('published', true);

    if (blogs) {
      // Group blogs by slug to organize alternates
      const blogGroupBySlug: Record<
        string,
        { slug: string; language: string; updated_at: string }[]
      > = {};
      blogs.forEach((blog) => {
        if (!blogGroupBySlug[blog.slug]) {
          blogGroupBySlug[blog.slug] = [];
        }
        blogGroupBySlug[blog.slug].push(blog);
      });

      // For each slug, output one page entry per language
      Object.entries(blogGroupBySlug).forEach(([slug, blogGroup]) => {
        // Build alternates record for this blog slug
        const blogAlternates: Record<string, string> = {};
        blogGroup.forEach((blog) => {
          blogAlternates[blog.language] =
            `${baseUrl}/blog/${slug}/${blog.language && blog.language !== 'fr' ? `?lang=${blog.language}` : ''}`;
        });

        // Push each language version of the blog to sitemap
        blogGroup.forEach((blog) => {
          const blogUrl = `${baseUrl}/blog/${slug}/${blog.language && blog.language !== 'fr' ? `?lang=${blog.language}` : ''}`;
          pages.push({
            url: blogUrl,
            lastModified: new Date(blog.updated_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
            alternates: {
              languages: blogAlternates,
            },
          });
        });
      });
    }
  }

  return pages;
}
