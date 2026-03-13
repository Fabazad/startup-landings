import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';
import { languages } from 'src/locales/config-locales';

// Force dynamic generation to ensure correct domain in URLs
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  // Get subdomain
  const subdomain = host.replace(/^www\./, '').split('.')[0];
  const productIdea = Object.values(RAW_PRODUCT_IDEAS).find(
    (productIdea) => productIdea.id === subdomain
  );

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

  return pages;
}

