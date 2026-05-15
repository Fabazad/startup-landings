'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect } from 'react';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { localStorageGetItem } from 'src/utils/storage-available';

import { CONFIG } from 'src/config-global';

import { fallbackLng, i18nOptions, cookieName } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

let lng: LanguageValue | undefined;

if (CONFIG.isStaticExport) {
  lng = localStorageGetItem('i18nextLng', fallbackLng) as LanguageValue | undefined;
}

const init = CONFIG.isStaticExport
  ? { ...i18nOptions(lng), detection: { caches: ['localStorage'] } }
  : {
      ...i18nOptions(),
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        lookupQuerystring: 'lang',
        caches: ['localStorage', 'cookie'],
        lookupCookie: cookieName,
        cookieOptions: { path: '/', sameSite: 'strict' as const },
      },
    };

if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
    .init(init);
}

// ----------------------------------------------------------------------

type Props = {
  lang?: LanguageValue;
  children: React.ReactNode;
};

/**
 * Synchronises i18next with the server-resolved language. The first render
 * must match the server's lang attribute to avoid hydration mismatches and
 * Lighthouse SEO penalties, so we set it synchronously the first time.
 * Subsequent prop changes (e.g. after middleware redirect) are picked up
 * via the effect.
 */
export function I18nProvider({ lang = undefined, children }: Props) {
  if (lang && i18next.language !== lang) {
    i18next.changeLanguage(lang);
  }

  useEffect(() => {
    if (lang && i18next.language !== lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return <Provider i18n={i18next}>{children}</Provider>;
}
