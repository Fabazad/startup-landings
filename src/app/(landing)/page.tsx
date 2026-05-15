import { Metadata } from 'next';
import { headers } from 'next/headers';

import { GlobalStructuredData, SoftwareStructuredData } from 'src/components/seo/structured-data';
import { LandingView, ProjectsDirectoryView } from 'src/sections/landing/view';
import { RAW_PRODUCT_IDEAS, PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';
import { translateProductIdea } from 'src/types/ProductIdea';
import { detectLanguage, getServerTranslations } from 'src/locales/server';
import { languages, fallbackLng } from 'src/locales/config-locales';
import { CONFIG } from 'src/config-global';
import { AuthProvider } from '../providers/auth-provider';
import { getRawProductIdea } from '../getProductIdea';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

const OG_LOCALE: Record<string, string> = { fr: 'fr_FR', en: 'en_US' };

export async function generateMetadata(): Promise<Metadata> {
  const rawProductIdea = await getRawProductIdea();
  if (!rawProductIdea) {
    return {};
  }

  const lang = CONFIG.isStaticExport ? fallbackLng : await detectLanguage();

  const isEnvy = rawProductIdea.id === RAW_PRODUCT_IDEAS[PRODUCT_IDEA_NAMES.ENVY].id;
  const baseUrl = isEnvy ? 'https://envynest.fr' : `https://${rawProductIdea.id}.onama.io`;

  const headingPart1 = rawProductIdea.heroTexts.headingPart1[lang];
  const headingPart2 = rawProductIdea.heroTexts.headingPart2[lang];
  const description = rawProductIdea.heroTexts.description[lang];
  const title = `${rawProductIdea.name} - ${headingPart1} ${headingPart2}`;

  const alternateLanguages = Object.fromEntries(languages.map((l) => [l, `${baseUrl}?lang=${l}`]));
  const alternateLocale = languages.filter((l) => l !== lang).map((l) => OG_LOCALE[l] ?? l);

  return {
    title,
    description,
    keywords: rawProductIdea.keywords.join(', '),
    icons: {
      icon: `/favicon/${rawProductIdea.themeColor}-${rawProductIdea.logo}.png`,
    },
    alternates: {
      canonical: baseUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      url: baseUrl,
      title,
      description,
      siteName: rawProductIdea.name,
      locale: OG_LOCALE[lang] ?? lang,
      alternateLocale,
      images: [
        {
          url: `${baseUrl}/logo/${rawProductIdea.themeColor}-${rawProductIdea.logo}.webp`,
          width: 1200,
          height: 630,
          alt: rawProductIdea.name,
        },
      ],
    },
  };
}

export default async function Page() {
  const rawProductIdea = await getRawProductIdea();
  const lang = CONFIG.isStaticExport ? fallbackLng : await detectLanguage();

  if (!rawProductIdea) {
    const productIdeas = Object.values(RAW_PRODUCT_IDEAS).map((raw) =>
      translateProductIdea(raw, lang)
    );

    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'localhost:8082';
    const protocol = headersList.get('x-forwarded-proto') || 'http';

    return (
      <ProjectsDirectoryView
        productIdeas={productIdeas}
        baseUrl={host.replace(/^www\./, '')}
        protocol={protocol}
      />
    );
  }

  const isEnvy = rawProductIdea.id === RAW_PRODUCT_IDEAS[PRODUCT_IDEA_NAMES.ENVY].id;
  const baseUrl = isEnvy ? 'https://envynest.fr' : `https://${rawProductIdea.id}.onama.io`;

  const { t } = await getServerTranslations();

  return (
    <AuthProvider productName={rawProductIdea.name}>
      <GlobalStructuredData rawProductIdea={rawProductIdea} baseUrl={baseUrl} />
      <SoftwareStructuredData rawProductIdea={rawProductIdea} />
      <LandingView
        headingPart1={rawProductIdea.heroTexts.headingPart1[lang]}
        headingPart2={rawProductIdea.heroTexts.headingPart2[lang]}
        description={rawProductIdea.heroTexts.description[lang]}
        hasPlans={!!rawProductIdea.plans}
        ratingsText={t('landing.hero.ratings')}
      />
    </AuthProvider>
  );
}
