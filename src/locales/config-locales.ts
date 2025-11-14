// ----------------------------------------------------------------------

export const LanguageValue = { EN: 'en', FR: 'fr' } as const;
export type LanguageValue = (typeof LanguageValue)[keyof typeof LanguageValue];
export type Translated = Record<LanguageValue, string>;

export const fallbackLng = LanguageValue.EN;
export const languages = Object.values(LanguageValue);
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<LanguageValue, { error: string; loading: string }> = {
  en: {
    error: 'Error changing language!',
    loading: 'Loading...',
  },

  fr: {
    error: 'Erreur lors du changement de langue!',
    loading: 'Chargement...',
  },
};
