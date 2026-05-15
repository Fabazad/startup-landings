'use client';

import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { usePathname, useRouter, useSearchParams } from 'src/routes/hooks';

import { allLangs } from './all-langs';
import { fallbackLng } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.find((lang) => lang.value === fallbackLng) ?? allLangs[0];
  const currentLang = allLangs.find((lang) => lang.value === i18n.resolvedLanguage);

  const onChangeLang = useCallback(
    async (newLang: LanguageValue) => {
      if (newLang === i18n.resolvedLanguage) return;

      // Update the client immediately so all `useTranslation` consumers re-render.
      // The LanguageDetector persists the choice to cookie + localStorage.
      await i18n.changeLanguage(newLang);

      const nextLang = allLangs.find((lang) => lang.value === newLang);
      if (nextLang) dayjs.locale(nextLang.adapterLocale);

      // Stay on the current page (don't snap back to "/") and let the
      // middleware see `?lang=`. It sets the cookie and redirects to the
      // clean URL, which also refreshes server components in the new language.
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      params.set('lang', newLang);
      router.push(`${pathname}?${params.toString()}`);
    },
    [i18n, pathname, router, searchParams]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
