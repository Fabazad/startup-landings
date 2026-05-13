import { Metadata } from 'next';
import { headers } from 'next/headers';
import { languages } from 'src/locales/config-locales';
import { SoftwareStructuredData } from 'src/components/seo/structured-data';
import { LandingView, ProjectsDirectoryView } from 'src/sections/landing/view';
import { detectLanguage, getServerTranslations } from 'src/locales/server';
import { RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';
import { translateProductIdea } from 'src/types/ProductIdea';
import { AuthProvider } from '../providers/auth-provider';
import { getRawProductIdea } from '../getProductIdea';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    alternates: {
      canonical: baseUrl,
      languages: Object.fromEntries(languages.map((lang) => [lang, `${baseUrl}?lang=${lang}`])),
    },
  };
}

export default async function Page() {
  const rawProductIdea = await getRawProductIdea();

  if (!rawProductIdea) {
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    const lang = await detectLanguage();
    const productIdeas = Object.values(RAW_PRODUCT_IDEAS).map((idea) =>
      translateProductIdea(idea, lang)
    );

    return (
      <AuthProvider productName={'Onama' as any}>
        <ProjectsDirectoryView productIdeas={productIdeas} baseUrl={host} protocol={protocol} />
      </AuthProvider>
    );
  }

  const lang = await detectLanguage();
  const { heroTexts, plans, name } = rawProductIdea;
  const { t } = await getServerTranslations();
  const ratingsText = t('landing.hero.ratings');

  return (
    <AuthProvider productName={name}>
      <SoftwareStructuredData rawProductIdea={rawProductIdea} />
      <LandingView
        headingPart1={heroTexts.headingPart1[lang]}
        headingPart2={heroTexts.headingPart2[lang]}
        description={heroTexts.description[lang]}
        hasPlans={!!plans}
        ratingsText={ratingsText}
      />
    </AuthProvider>
  );
}
