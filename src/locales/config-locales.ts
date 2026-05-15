// ----------------------------------------------------------------------

export const LanguageValue = { EN: 'en', FR: 'fr' } as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LanguageValue = (typeof LanguageValue)[keyof typeof LanguageValue];
export type Translated = Record<LanguageValue, string>;

export const fallbackLng = LanguageValue.FR;
export const languages = Object.values(LanguageValue);
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng as LanguageValue, ns = defaultNS) {
  return {
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}
