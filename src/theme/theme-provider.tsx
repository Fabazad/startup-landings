'use client';

// MUI X (data grid, tree view, date pickers) augmentations are intentionally
// not imported. They are only needed where those components render.
import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';

import { createTheme } from './create-theme';
import { schemeConfig } from './scheme-config';
import { RTL } from './with-settings/right-to-left';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const { currentLang } = useTranslate();

  const settings = useSettingsContext();

  const theme = createTheme(currentLang?.systemValue, settings);

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <CssVarsProvider
        theme={theme}
        defaultMode={schemeConfig.defaultMode}
        modeStorageKey={schemeConfig.modeStorageKey}
      >
        <CssBaseline />
        <RTL direction={settings.direction}>{children}</RTL>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  );
}
