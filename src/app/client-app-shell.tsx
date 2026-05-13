'use client';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { LocalizationProvider } from 'src/locales';
import { I18nProvider } from 'src/locales/i18n-provider';
import { schemeConfig } from 'src/theme/scheme-config';
import { ThemeProvider } from 'src/theme/theme-provider';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { DeferredProgressBar } from 'src/components/progress-bar/deferred-progress-bar';
import { defaultSettings } from 'src/components/settings/config-settings';
import { DeferredSettingsDrawer } from 'src/components/settings/deferred-settings-drawer';
import { SettingsProvider } from 'src/components/settings/context';
import { DeferredSnackbar } from 'src/components/snackbar/deferred-snackbar';
import { SubscriptionModalProvider } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';
import { RAW_PRODUCT_IDEAS, PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';
import { PostHogProvider } from './providers/posthog-provider';
import { DeferredAnalytics } from './providers/deferred-analytics';
import { DeferredCrisp } from './providers/deferred-crisp';
import ReactQueryProvider from './providers/react-query-provider';
import { ProductIdeaProvider } from './product-idea-provider';

/**
 * All client-side providers that previously lived in the async RootLayout.
 * Moving them here makes the root layout fully static, which enables
 * back/forward cache (bfcache) and ISR caching.
 */
export function ClientAppShell({ children }: { children: React.ReactNode }) {
  const rawProductIdea = RAW_PRODUCT_IDEAS.Envy;

  return (
    <>
      <InitColorSchemeScript
        defaultMode={schemeConfig.defaultMode}
        modeStorageKey={schemeConfig.modeStorageKey}
      />
      <I18nProvider lang="fr">
        <LocalizationProvider>
          <SettingsProvider
            settings={{
              ...defaultSettings,
              primaryColor: rawProductIdea.themeColor || 'blue',
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
        <DeferredCrisp websiteId="58dbd684-000f-45ec-99c8-932b871cf9fc" locale="fr" />
      )}
    </>
  );
}
