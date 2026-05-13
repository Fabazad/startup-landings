'use client';

// core (MUI)
import { frFR as frFRCore } from '@mui/material/locale';

import { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

/**
 * `systemValue.components` previously merged MUI X DataGrid / DatePicker /
 * DataGrid locales here. Those packages are not rendered on any route in the
 * current product surface, so importing their `locales` modules just to copy
 * component label strings dragged 1–2 KB of MUI X into the shared landing
 * chunk for no visible effect. The component overrides are left empty until
 * a date picker / data grid is actually mounted.
 */
export const allLangs = [
  {
    value: LanguageValue.EN,
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: {},
    },
  },
  {
    value: LanguageValue.FR,
    label: 'French',
    countryCode: 'FR',
    adapterLocale: 'fr',
    numberFormat: { code: 'fr-Fr', currency: 'EUR' },
    systemValue: {
      components: { ...frFRCore.components },
    },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
