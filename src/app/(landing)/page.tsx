import { Metadata } from 'next';
import { headers } from 'next/headers';

import { GlobalStructuredData, SoftwareStructuredData } from 'src/components/seo/structured-data';
import { LandingView, ProjectsDirectoryView } from 'src/sections/landing/view';
import { RAW_PRODUCT_IDEAS, PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';
import { translateProductIdea } from 'src/types/ProductIdea';
import { detectLanguage } from 'src/locales/server';
import { CONFIG } from 'src/config-global';
import { AuthProvider } from '../providers/auth-provider';
import { getRawProductIdea } from '../getProductIdea';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const rawProductIdea = await getRawProductIdea();
  if (!rawProductIdea) {
    return {};
  }

  const isEnvy = rawProductIdea.id === RAW_PRODUCT_IDEAS[PRODUCT_IDEA_NAMES.ENVY].id;
  const baseUrl = isEnvy ? 'https://envynest.fr' : `https://${rawProductIdea.id}.onama.io`;

  return {
    title: `${rawProductIdea.name} - ${rawProductIdea.heroTexts.headingPart1.fr} ${rawProductIdea.heroTexts.headingPart2.fr}`,
    description: rawProductIdea.heroTexts.description.fr,
    keywords: rawProductIdea.keywords.join(', '),
    icons: {
      icon: `/favicon/${rawProductIdea.themeColor}-${rawProductIdea.logo}.png`,
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        fr: `${baseUrl}?lang=fr`,
        en: `${baseUrl}?lang=en`,
      },
    },
    openGraph: {
      type: 'website',
      url: baseUrl,
      title: `${rawProductIdea.name} - ${rawProductIdea.heroTexts.headingPart1.fr} ${rawProductIdea.heroTexts.headingPart2.fr}`,
      description: rawProductIdea.heroTexts.description.fr,
      siteName: rawProductIdea.name,
      locale: 'fr_FR',
      alternateLocale: 'en_US',
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

  if (!rawProductIdea) {
    const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
    const productIdeas = Object.values(RAW_PRODUCT_IDEAS).map((raw) =>
      translateProductIdea(raw, lang as any)
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

  return (
    <AuthProvider productName={rawProductIdea.name}>
      <GlobalStructuredData rawProductIdea={rawProductIdea} baseUrl={baseUrl} />
      <SoftwareStructuredData rawProductIdea={rawProductIdea} />
      <LandingView
        headingPart1={rawProductIdea.heroTexts.headingPart1.fr}
        headingPart2={rawProductIdea.heroTexts.headingPart2.fr}
        description={rawProductIdea.heroTexts.description.fr}
        hasPlans={!!rawProductIdea.plans}
        ratingsText="+160 Utilisateurs satisfaits"
      />
    </AuthProvider>
  );
}
