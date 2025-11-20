import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  // Get subdomain
  const subdomain = host.split('.')[0];
  const productIdea = Object.values(RAW_PRODUCT_IDEAS).find(
    (productIdea) => productIdea.id === subdomain
  );

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/auth/',
          '/auth-demo/',
          '/components/',
          '/error/',
          '/maintenance/',
          '/blank/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
