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
  PrimaryColor,
  SettingsDrawer,
  SettingsProvider,
} from 'src/components/settings';
import { Snackbar } from 'src/components/snackbar';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import { AuthProvider as AmplifyAuthProvider } from 'src/auth/context/amplify';
import { AuthProvider as Auth0AuthProvider } from 'src/auth/context/auth0';
import { AuthProvider as FirebaseAuthProvider } from 'src/auth/context/firebase';
import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { AuthProvider as SupabaseAuthProvider } from 'src/auth/context/supabase';
import { RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';
import { SubscriptionModalProvider } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';
import { ProductIdeaProvider } from './product-idea-provider';
import { PostHogProvider } from './providers/posthog-provider';
import ReactQueryProvider from './providers/react-query-provider';

// ----------------------------------------------------------------------

const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  JwtAuthProvider;

function getThemeColorValue(themeColor: PrimaryColor): string {
  if (themeColor === 'blue') return info.main;
  if (themeColor === 'purple') return secondary.main;
  if (themeColor === 'orange') return warning.main;
  if (themeColor === 'red') return error.main;
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
  const url = (await headers().get('x-forwarded-host')) ?? '';
  const subdomain = url.split('.')[0];

  const productIdea = Object.values(RAW_PRODUCT_IDEAS).find(
    (productIdea) => productIdea.id === subdomain
  );
  if (productIdea) return productIdea;
  return RAW_PRODUCT_IDEAS.InsightFeed;
};

export async function generateMetadata(): Promise<Metadata> {
  const rawProductIdea = await getRawProductIdea();

  return {
    title: rawProductIdea.name,
    description: rawProductIdea.heroTexts.description.en,
    icons: `${CONFIG.assetsDir}/favicon/${rawProductIdea.themeColor}-${rawProductIdea.logo}.ico`,
    themeColor: getThemeColorValue(rawProductIdea.themeColor),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const rawProductIdea = await getRawProductIdea();

  return (
    <html lang={lang ?? 'en'} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          modeStorageKey={schemeConfig.modeStorageKey}
        />

        <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <LocalizationProvider>
            <AuthProvider>
              <SettingsProvider
                settings={{
                  ...defaultSettings,
                  primaryColor: rawProductIdea.themeColor,
                  fontFamily: 'Nunito Sans Variable',
                }}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <CheckoutProvider>
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
                    </CheckoutProvider>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
