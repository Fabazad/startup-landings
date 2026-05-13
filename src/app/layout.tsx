import 'src/global.css';

// ----------------------------------------------------------------------

import type { Metadata, Viewport } from 'next';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { error, info, primary, secondary, warning } from 'src/theme/core/palette';
import { CONFIG } from 'src/config-global';
import { LocalizationProvider } from 'src/locales';
import { I18nProvider } from 'src/locales/i18n-provider';
import { detectLanguage } from 'src/locales/server';
import { schemeConfig } from 'src/theme/scheme-config';
import { ThemeProvider } from 'src/theme/theme-provider';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { DeferredProgressBar } from 'src/components/progress-bar/deferred-progress-bar';
import { defaultSettings } from 'src/components/settings/config-settings';
import { DeferredSettingsDrawer } from 'src/components/settings/deferred-settings-drawer';
import { PrimaryColor } from 'src/components/settings/types';
import { SettingsProvider } from 'src/components/settings/context';
import { DeferredSnackbar } from 'src/components/snackbar/deferred-snackbar';
import { headers } from 'next/headers';
import { GlobalStructuredData } from 'src/components/seo/structured-data';
import { languages } from 'src/locales/config-locales';
import { SubscriptionModalProvider } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';
import { PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';
import { ProductIdeaProvider } from './product-idea-provider';
import { PostHogProvider } from './providers/posthog-provider';
import { DeferredAnalytics } from './providers/deferred-analytics';
import { DeferredCrisp } from './providers/deferred-crisp';
import ReactQueryProvider from './providers/react-query-provider';
import { getRawProductIdea } from './getProductIdea';
import { barlow, nunitoSans } from './fonts';

// ----------------------------------------------------------------------

function getThemeColorValue(themeColor: PrimaryColor): string {
  if (themeColor === 'blue') return info.main;
  if (themeColor === 'purple') return secondary.main;
  if (themeColor === 'orange') return warning.main;
  if (themeColor === 'red') return error.main;
  if (themeColor === 'lavender') return secondary.main;
  return primary.main;
}

export const generateViewport: () => Promise<Viewport> = async () => {
  const rawProductIdea = await getRawProductIdea();
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: getThemeColorValue(rawProductIdea?.themeColor || 'blue'),
  };
};

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const rawProductIdea = await getRawProductIdea();

  // Get the current URL for Open Graph
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const imageUrl = rawProductIdea
    ? `${baseUrl}/logo/${rawProductIdea.themeColor}-${rawProductIdea.logo}.webp`
    : `${baseUrl}/logo/blue-octopus.webp`;
  const description = rawProductIdea
    ? rawProductIdea.heroTexts.description.fr
    : "Un portfolio d'applications innovantes.";

  // Generate keywords from product features
  const keywords = rawProductIdea
    ? rawProductIdea.keywords.join(', ')
    : 'onama, apps, startups, portfolio';

  // Generate alternate languages
  const alternates = {
    languages: Object.fromEntries(languages.map((lang) => [lang, `${baseUrl}?lang=${lang}`])),
  };

  const title = rawProductIdea
    ? `${rawProductIdea.name} - ${rawProductIdea.heroTexts.headingPart1.fr} ${rawProductIdea.heroTexts.headingPart2.fr}`
    : `Onama - Bienvenue sur Onama`;

  const siteName = rawProductIdea?.name || 'Onama';

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    icons: {
      icon: rawProductIdea
        ? `/favicon/${rawProductIdea.themeColor}-${rawProductIdea.logo}.ico`
        : '/favicon/blue-octopus.ico',
    },
    alternates,
    openGraph: {
      type: 'website',
      url: baseUrl,
      title,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      locale: 'fr_FR',
      alternateLocale: languages.filter((l) => l !== 'fr').map((l) => (l === 'en' ? 'en_US' : l)),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: `@${siteName.toLowerCase().replace(/\s+/g, '')}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const rawProductIdea = await getRawProductIdea();

  // Get base URL for structured data
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  return (
    <html
      lang={lang ?? 'en'}
      suppressHydrationWarning
      className={`${barlow.variable} ${nunitoSans.variable}`}
    >
      <head>
        {/* Keep critical connections focused on first paint; analytics/chat load after intent. */}
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
        {rawProductIdea?.name === PRODUCT_IDEA_NAMES.ENVY && (
          <>
            {/* @ts-expect-error: impact specifically requests 'value' attribute */}
            <meta name="impact-site-verification" value="264b8bdb-8b2d-424f-bec6-5c55a7306a39" />
            <meta name="fo-verify" content="f3a44355-3cf6-4dd8-a9ae-4cc39d425637" />
            <meta name="mylead-verification" content="b29df0cc12dd544d785a848089b958d2" />
          </>
        )}
      </head>
      <body>
        {rawProductIdea && (
          <GlobalStructuredData rawProductIdea={rawProductIdea} baseUrl={baseUrl} />
        )}
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        />
        <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <LocalizationProvider>
            <SettingsProvider
              settings={{
                ...defaultSettings,
                primaryColor: rawProductIdea?.themeColor || 'blue',
                fontFamily: 'Nunito Sans Variable',
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <PostHogProvider>
                    <ReactQueryProvider>
                      {rawProductIdea ? (
                        <ProductIdeaProvider rawProductIdea={rawProductIdea}>
                          <SubscriptionModalProvider>
                            <DeferredSnackbar />
                            <DeferredProgressBar />
                            <DeferredSettingsDrawer />
                            {children}
                          </SubscriptionModalProvider>
                        </ProductIdeaProvider>
                      ) : (
                        <SubscriptionModalProvider>
                          <DeferredSnackbar />
                          <DeferredProgressBar />
                          <DeferredSettingsDrawer />
                          {children}
                        </SubscriptionModalProvider>
                      )}
                    </ReactQueryProvider>
                  </PostHogProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </I18nProvider>
        <DeferredAnalytics />
        {rawProductIdea?.name === PRODUCT_IDEA_NAMES.ENVY && (
          <DeferredCrisp websiteId="58dbd684-000f-45ec-99c8-932b871cf9fc" locale={lang ?? 'en'} />
        )}
      </body>
    </html>
  );
}
