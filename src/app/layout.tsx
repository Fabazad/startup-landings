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
import { ProgressBar } from 'src/components/progress-bar';
import {
  defaultSettings,
} from 'src/components/settings/config-settings';
import {
  PrimaryColor,
} from 'src/components/settings/types';
import {
  SettingsProvider,
} from 'src/components/settings/context';
import { Snackbar } from 'src/components/snackbar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const SettingsDrawer = dynamic(() => import('src/components/settings/drawer').then(m => m.SettingsDrawer), {
  ssr: false,
});
import { StructuredData } from 'src/components/seo/structured-data';
import { languages } from 'src/locales/config-locales';
import { DEFAULT_PRODUCT_IDEA, RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';
import { SubscriptionModalProvider } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';
import { ProductIdeaProvider } from './product-idea-provider';
import { PostHogProvider } from './providers/posthog-provider';
import ReactQueryProvider from './providers/react-query-provider';
import { AuthProvider } from './providers/auth-provider';

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
    themeColor: getThemeColorValue(rawProductIdea.themeColor),
  };
};

const getRawProductIdea = async () => {
  // get url subdomain from url on server
  const headersList = await headers();
  const url = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const subdomain = url.replace(/^www\./, '').split('.')[0];

  const productIdea = Object.values(RAW_PRODUCT_IDEAS).find(
    (productIdea) => productIdea.id === subdomain
  );
  if (productIdea) return productIdea;
  return DEFAULT_PRODUCT_IDEA;
};

export async function generateMetadata(): Promise<Metadata> {
  const rawProductIdea = await getRawProductIdea();

  // Get the current URL for Open Graph
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const imageUrl = `${baseUrl}/logo/${rawProductIdea.themeColor}-${rawProductIdea.logo}.svg`;
  const description = rawProductIdea.heroTexts.description.fr;

  // Generate keywords from product features
  const keywords = rawProductIdea.keywords.join(', ');

  // Generate alternate languages
  const alternates = {
    languages: Object.fromEntries(languages.map((lang) => [lang, `${baseUrl}?lang=${lang}`])),
    canonical: baseUrl,
  };

  const title = `${rawProductIdea.name} - ${rawProductIdea.heroTexts.headingPart1.fr} ${rawProductIdea.heroTexts.headingPart2.fr}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    icons: {
      icon: `/favicon/${rawProductIdea.themeColor}-${rawProductIdea.logo}.ico`,
    },
    alternates,
    openGraph: {
      type: 'website',
      url: baseUrl,
      title,
      description,
      siteName: rawProductIdea.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: rawProductIdea.name,
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
      creator: '@' + rawProductIdea.name.toLowerCase().replace(/\s+/g, ''),
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
    <html lang={lang ?? 'en'} suppressHydrationWarning>
      <body>
        <StructuredData rawProductIdea={rawProductIdea} baseUrl={baseUrl} />
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        />
        <AuthProvider>

        <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <LocalizationProvider>
              <SettingsProvider
                settings={{
                  ...defaultSettings,
                  primaryColor: rawProductIdea.themeColor,
                  fontFamily: 'Nunito Sans Variable',
                }}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <PostHogProvider>
                      <ReactQueryProvider>
                        <ProductIdeaProvider rawProductIdea={rawProductIdea}>
                          <SubscriptionModalProvider>
                            <Snackbar />
                            <ProgressBar />
                            <SettingsDrawer />
                            {children}
                          </SubscriptionModalProvider>
                        </ProductIdeaProvider>
                      </ReactQueryProvider>
                    </PostHogProvider>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
          </LocalizationProvider>
        </I18nProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
        {rawProductIdea.id === 'envy' && (
          <Script
            id="crisp-chat"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.CRISP_RUNTIME_CONFIG = { locale: "${lang ?? 'en'}" };window.$crisp=[];window.CRISP_WEBSITE_ID="58dbd684-000f-45ec-99c8-932b871cf9fc";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
            }}
          />
        )}
      </body>
    </html>
  );
}
