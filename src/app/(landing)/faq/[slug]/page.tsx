import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getProductIdea } from 'src/app/getProductIdea';
import { detectLanguage } from 'src/locales/server';
import { languages } from 'src/locales/config-locales';
import { LandingFaqPageView } from 'src/sections/landing/view';
import { FaqStructuredData } from 'src/components/seo/faq-structured-data';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await detectLanguage();
  const productIdea = await getProductIdea();

  if (!productIdea.faq || !productIdea.faq.pages) {
    return {};
  }

  const faqPageInfo = productIdea.faq.pages.find(
    (page) => page.slug[lang as 'en' | 'fr'] === params.slug || page.slug.en === params.slug
  );

  if (!faqPageInfo) {
    return {};
  }

  // Build base URL from headers
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const canonicalUrl = `${baseUrl}/faq/${params.slug}/`;

  // Build alternate language URLs
  const alternateLangUrls: Record<string, string> = {};
  languages.forEach((l) => {
    const slug = faqPageInfo.slug[l as 'en' | 'fr'] || faqPageInfo.slug.en;
    alternateLangUrls[l] = `${baseUrl}/faq/${slug}/`;
  });

  return {
    title: faqPageInfo.seo.title,
    description: faqPageInfo.seo.description,
    keywords: faqPageInfo.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLangUrls,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: faqPageInfo.seo.title,
      description: faqPageInfo.seo.description,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title: faqPageInfo.seo.title,
      description: faqPageInfo.seo.description,
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const lang = await detectLanguage();
  const productIdea = await getProductIdea();

  if (!productIdea.faq || !productIdea.faq.pages) {
    notFound();
  }

  const faqPageInfoData = productIdea.faq.pages.find(
    (page) => page.slug[lang as 'en' | 'fr'] === params.slug || page.slug.en === params.slug
  );

  if (!faqPageInfoData) {
    notFound();
  }

  // Build base URL for structured data
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  return (
    <>
      <FaqStructuredData faqPage={faqPageInfoData} baseUrl={baseUrl} />
      <LandingFaqPageView faqPage={faqPageInfoData} />
    </>
  );
}
