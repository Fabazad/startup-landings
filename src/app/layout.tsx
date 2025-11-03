import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CONFIG } from 'src/config-global';
import { LocalizationProvider } from 'src/locales';
import { I18nProvider } from 'src/locales/i18n-provider';
import { detectLanguage } from 'src/locales/server';
import { primary } from 'src/theme/core/palette';
import { schemeConfig } from 'src/theme/scheme-config';
import { ThemeProvider } from 'src/theme/theme-provider';

import { MotionLazy } from 'src/components/animate/motion-lazy';
import { ProgressBar } from 'src/components/progress-bar';
import { defaultSettings, SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { Snackbar } from 'src/components/snackbar';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { GoogleAnalytics } from '@next/third-parties/google';

import { AuthProvider as AmplifyAuthProvider } from 'src/auth/context/amplify';
import { AuthProvider as Auth0AuthProvider } from 'src/auth/context/auth0';
import { AuthProvider as FirebaseAuthProvider } from 'src/auth/context/firebase';
import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { AuthProvider as SupabaseAuthProvider } from 'src/auth/context/supabase';
import { RAW_PRODUCT_IDEAS } from 'src/ProductIdeas';
import { ProductIdeaProvider } from './product-idea-provider';

// ----------------------------------------------------------------------

const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  JwtAuthProvider;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const rawProductIdea = RAW_PRODUCT_IDEAS.InsightFeed;

  return (
    <html lang={lang ?? 'en'} suppressHydrationWarning>
      <head>
        <title>{rawProductIdea.name}</title>
        <link rel="icon" href={rawProductIdea.faviconUrl} />
        <link rel="shortcut icon" href={rawProductIdea.faviconUrl} />
        <link rel="apple-touch-icon" href={rawProductIdea.faviconUrl} />
      </head>
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
                      <ProductIdeaProvider rawProductIdea={rawProductIdea}>
                        <Snackbar />
                        <ProgressBar />
                        <SettingsDrawer />
                        {children}
                      </ProductIdeaProvider>
                    </CheckoutProvider>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </I18nProvider>
      </body>
      <GoogleAnalytics gaId={rawProductIdea.gaId} />
    </html>
  );
}
