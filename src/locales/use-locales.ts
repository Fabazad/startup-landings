'use client';

import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';

import { allLangs } from './all-langs';
import { fallbackLng, changeLangMessages as messages } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const router = useRouter();

  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === fallbackLng)[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.resolvedLanguage);

  const onChangeLang = useCallback(
    async (newLang: LanguageValue) => {
      try {
        await i18n.changeLanguage(newLang);

        // Note: i18next LanguageDetector automatically saves to localStorage and cookie
        // when configured with caches: ['localStorage', 'cookie']

        const currentMessages = messages[newLang] || messages.en;

        if (currentLang) {
          dayjs.locale(currentLang.adapterLocale);
        }

        toast.success(currentMessages.loading);

        // Navigate with ?lang= param so the middleware picks it up and
        // sets the `x-lang` header for all subsequent server renders.
        router.push(`/?lang=${newLang}`);
      } catch (error) {
        const currentMessages = messages[i18n.resolvedLanguage as LanguageValue] || messages.en;
        toast.error(currentMessages.error);
      }
    },
    [currentLang, i18n, router]
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
