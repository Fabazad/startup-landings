'use client';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { LocalizationProvider } from 'src/locales';
import { I18nProvider } from 'src/locales/i18n-provider';
import { schemeConfig } from 'src/theme/scheme-config';
import { ThemeProvider } from 'src/theme/theme-provider';
import { DeferredMotionLazy } from 'src/components/animate/deferred-motion-lazy';
import { DeferredProgressBar } from 'src/components/progress-bar/deferred-progress-bar';
import { defaultSettings } from 'src/components/settings/config-settings';
import { DeferredSettingsDrawer } from 'src/components/settings/deferred-settings-drawer';
import { SettingsProvider } from 'src/components/settings/context';
import { DeferredSnackbar } from 'src/components/snackbar/deferred-snackbar';
import { SubscriptionModalProvider } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';
import { PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';
import { RawProductIdea } from 'src/types/ProductIdea';
import { LanguageValue } from 'src/locales/config-locales';
import { PostHogProvider } from './providers/posthog-provider';
import { DeferredAnalytics } from './providers/deferred-analytics';
import { DeferredCrisp } from './providers/deferred-crisp';
import ReactQueryProvider from './providers/react-query-provider';
import { ProductIdeaProvider } from './product-idea-provider';

/**
 * All client-side providers. `lang` is resolved server-side by the root
 * layout (via cookie / `x-lang` header set by middleware) and threaded
 * through to i18next so the very first render matches the server output.
 */
export function ClientAppShell({
  children,
  rawProductIdea,
  lang,
}: {
  children: React.ReactNode;
  rawProductIdea: RawProductIdea | null;
  lang: LanguageValue;
}) {
  return (
    <>
      <InitColorSchemeScript
        defaultMode={schemeConfig.defaultMode}
        modeStorageKey={schemeConfig.modeStorageKey}
      />
      <I18nProvider lang={lang}>
        <LocalizationProvider>
          <SettingsProvider
            settings={{
              ...defaultSettings,
              primaryColor: rawProductIdea?.themeColor || 'blue',
              fontFamily: 'Nunito Sans Variable',
            }}
          >
            <ThemeProvider>
              <DeferredMotionLazy>
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
              </DeferredMotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </I18nProvider>
      <DeferredAnalytics />
      {rawProductIdea?.name === PRODUCT_IDEA_NAMES.ENVY && (
        <DeferredCrisp websiteId="58dbd684-000f-45ec-99c8-932b871cf9fc" locale={lang} />
      )}
    </>
  );
}
