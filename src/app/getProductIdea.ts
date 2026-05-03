import { headers } from 'next/headers';
import { detectLanguage } from 'src/locales/server';
import { DEFAULT_PRODUCT_IDEA, RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';
import { ProductIdea, RawProductIdea, translateProductIdea } from 'src/types/ProductIdea';

export const getRawProductIdea = async (): Promise<RawProductIdea | null> => {
  // get url subdomain from url on server
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const normalizedHost = host.replace(/^www\./, '');

  if (normalizedHost === 'envynest.fr') return RAW_PRODUCT_IDEAS.Envy;

  const subdomain = normalizedHost.split('.')[0];

  const productIdea = Object.values(RAW_PRODUCT_IDEAS).find((idea) => idea.id === subdomain);
  if (productIdea) return productIdea;

  return DEFAULT_PRODUCT_IDEA;
};

export const getProductIdea = async (): Promise<ProductIdea | null> => {
  const [lang, rawProductIdea] = await Promise.all([detectLanguage(), getRawProductIdea()]);
  if (!rawProductIdea) return null;
  const productIdea = translateProductIdea(rawProductIdea, lang);
  return productIdea;
};

/**
 * Use this in pages/layouts that are always under a product subdomain.
 * Throws if no product idea is found (e.g. root domain).
 */
export const getLandingProductIdea = async (): Promise<ProductIdea> => {
  const productIdea = await getProductIdea();
  if (!productIdea) throw new Error('No product idea found for this domain.');
  return productIdea;
};
