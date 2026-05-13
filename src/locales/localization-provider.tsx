'use client';

import { useEffect } from 'react';
import dayjs from 'dayjs';

import { useTranslate } from './use-locales';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

/**
 * Sets the current dayjs locale based on the active i18n language. The MUI
 * x-date-pickers LocalizationProvider used to wrap children here, but no
 * route in this app currently mounts a date picker, so it was dropped to
 * keep `@mui/x-date-pickers` and the static dayjs locale bundles out of the
 * shared client chunk. Locales are loaded lazily on language change.
 */
export function LocalizationProvider({ children }: Props): React.ReactNode {
  const { currentLang } = useTranslate();
  const locale = currentLang.adapterLocale;

  useEffect(() => {
    let cancelled = false;
    import(`dayjs/locale/${locale}.js`)
      .then(() => {
        if (!cancelled) dayjs.locale(locale);
      })
      .catch(() => {
        if (!cancelled) dayjs.locale('en');
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return children;
}
