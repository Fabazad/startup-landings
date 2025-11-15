'use client';

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

import { Logo } from 'src/components/logo';

import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { HomeFooter } from './footer';
import { Main } from './main';

import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { GetStartedButton } from '../../sections/landing/components/get-started-button';
import { LanguageButton } from '../../sections/landing/components/language-button';
import { NavDesktop } from './nav/desktop/NavDesktop';
import { NavMobile } from './nav/mobile/NavMobile';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function LandingLayout({ sx, children, header }: MainLayoutProps) {
  const { mode, setMode, systemMode } = useColorScheme();
  const { name } = useProductIdea();
  const { onUpdateField, colorScheme } = useSettingsContext();

  useEffect(() => {
    if (!colorScheme) setMode('system');
  }, []);

  const handleToggleTheme = () => {
    const newMode =
      mode === 'dark' || (mode === 'system' && systemMode === 'dark') ? 'light' : 'dark';
    onUpdateField('colorScheme', newMode);
    setMode(newMode);
  };

  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <NavMobile />
                {/* -- Logo -- */}
                <Logo />
                <Box
                  component="h4"
                  typography="h4"
                  sx={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: 'text.primary',
                    ml: 2,
                    mt: 4,
                  }}
                >
                  {name}
                </Box>
              </>
            ),
            rightArea: (
              <>
                {/* -- Nav desktop -- */}
                <NavDesktop />

                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                  <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <GetStartedButton buttonName="get-started-nav" />
                  </Stack>
                  <IconButton aria-label="toggle theme" onClick={handleToggleTheme}>
                    <Iconify
                      icon={
                        mode === 'dark' || (mode === 'system' && systemMode === 'dark')
                          ? 'ph:moon'
                          : 'ph:sun'
                      }
                    />
                  </IconButton>
                  <LanguageButton />
                </Box>
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<HomeFooter />}
      /** **************************************
       * Style
       *************************************** */
      sx={sx}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
