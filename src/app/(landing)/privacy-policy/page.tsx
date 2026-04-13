import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getLandingProductIdea } from 'src/app/getProductIdea';
import { detectLanguage } from 'src/locales/server';
import { LandingPrivacyPolicyView } from 'src/sections/landing/landing-privacy-policy-view';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const productIdea = await getLandingProductIdea();
  const lang = await detectLanguage();

  if (!productIdea.privacyPolicy) {
    return {};
  }

  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  const canonicalUrl = `${baseUrl}/privacy-policy/`;

  const title =
    lang === 'fr'
      ? `Politique de confidentialité - ${productIdea.name}`
      : `Privacy Policy - ${productIdea.name}`;

  const description =
    lang === 'fr'
      ? `Politique de confidentialité de ${productIdea.name}. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.`
      : `Privacy policy for ${productIdea.name}. Learn how we collect, use and protect your personal data.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

// ----------------------------------------------------------------------

export default async function PrivacyPolicyPage() {
  const productIdea = await getLandingProductIdea();

  if (!productIdea.privacyPolicy) {
    notFound();
  }

  return <LandingPrivacyPolicyView content={productIdea.privacyPolicy} />;
}
