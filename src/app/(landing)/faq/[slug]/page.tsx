import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductIdea } from 'src/app/getProductIdea';
import { detectLanguage } from 'src/locales/server';
import { LandingFaqPageView } from 'src/sections/landing/view';

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

  return {
    title: faqPageInfo.seo.title,
    description: faqPageInfo.seo.description,
    keywords: faqPageInfo.seo.keywords,
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

  return <LandingFaqPageView faqPage={faqPageInfoData} />;
}
