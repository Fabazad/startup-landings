import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';
import { languages } from 'src/locales/config-locales';

// Revalidate sitemap daily
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  // Get subdomain
  const subdomain = host.split('.')[0];
  const productIdea = Object.values(RAW_PRODUCT_IDEAS).find(
    (productIdea) => productIdea.id === subdomain
  );

  // Base pages for each language
  const pages = [
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

  return pages;
}
