'use client';

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { Logo } from 'src/components/logo';

import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { HomeFooter } from './footer';
import { Main } from './main';

import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useProductIdea } from 'src/app/product-idea-provider';
import { useSettingsContext } from 'src/components/settings'
import { GetStartedButton } from '../../sections/landing/components/get-started-button';
import { LanguageButton } from '../../sections/landing/components/language-button';
import { NavDesktop } from './nav/desktop/NavDesktop';
import { NavMobile } from './nav/mobile/NavMobile';
import { ThemeButton } from '../components/theme-button';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function LandingLayout({ sx, children, header }: MainLayoutProps) {
  const { setMode } = useColorScheme();
  const { name } = useProductIdea();
  const { colorScheme } = useSettingsContext();

  useEffect(() => {
    if (!colorScheme) setMode('system');
  }, []);


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
                  <ThemeButton />
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
