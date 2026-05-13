import { Metadata } from 'next';

import { GlobalStructuredData, SoftwareStructuredData } from 'src/components/seo/structured-data';
import { LandingView } from 'src/sections/landing/view';
import { RAW_PRODUCT_IDEAS, PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';
import { AuthProvider } from '../providers/auth-provider';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

const envy = RAW_PRODUCT_IDEAS[PRODUCT_IDEA_NAMES.ENVY];

export const metadata: Metadata = {
  title: `${envy.name} - ${envy.heroTexts.headingPart1.fr} ${envy.heroTexts.headingPart2.fr}`,
  description: envy.heroTexts.description.fr,
  keywords: envy.keywords.join(', '),
  icons: {
    icon: `/favicon/${envy.themeColor}-${envy.logo}.png`,
  },
  alternates: {
    canonical: 'https://envynest.fr',
    languages: {
      fr: 'https://envynest.fr?lang=fr',
      en: 'https://envynest.fr?lang=en',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://envynest.fr',
    title: `${envy.name} - ${envy.heroTexts.headingPart1.fr} ${envy.heroTexts.headingPart2.fr}`,
    description: envy.heroTexts.description.fr,
    siteName: envy.name,
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    images: [
      {
        url: `https://envynest.fr/logo/${envy.themeColor}-${envy.logo}.webp`,
        width: 1200,
        height: 630,
        alt: envy.name,
      },
    ],
  },
};

export default function Page() {
  return (
    <AuthProvider productName={envy.name}>
      <GlobalStructuredData rawProductIdea={envy} baseUrl="https://envynest.fr" />
      <SoftwareStructuredData rawProductIdea={envy} />
      <LandingView
        headingPart1={envy.heroTexts.headingPart1.fr}
        headingPart2={envy.heroTexts.headingPart2.fr}
        description={envy.heroTexts.description.fr}
        hasPlans={!!envy.plans}
        ratingsText="+160 Utilisateurs satisfaits"
      />
    </AuthProvider>
  );
}
