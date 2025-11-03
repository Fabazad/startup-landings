'use client';

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useColorScheme, useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';

import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { Footer, HomeFooter } from './footer';
import { Main } from './main';

import { useProductIdea } from 'src/app/product-idea-provider';
import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { SubscriptionModalProvider } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';
import { GetStartedButton } from '../../sections/landing/components/get-started-button';
import { LanguageButton } from '../../sections/landing/components/language-button';
import type { NavMainProps } from './nav/types';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  data?: {
    nav?: NavMainProps['data'];
  };
};

export function LandingLayout({ sx, data, children, header }: MainLayoutProps) {
  const pathname = usePathname();

  const { onUpdateField } = useSettingsContext();
  const { mode, setMode } = useColorScheme();
  const { name } = useProductIdea();

  const handleToggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    onUpdateField('colorScheme', newMode);
    setMode(newMode);
  };

  const homePage = pathname === '/';

  const layoutQuery: Breakpoint = 'md';

  return (
    <SubscriptionModalProvider>
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

                  <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                    <GetStartedButton />
                    <IconButton aria-label="toggle theme" onClick={handleToggleTheme}>
                      <Iconify icon={mode === 'dark' ? 'ph:moon' : 'ph:sun'} />
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
        footerSection={homePage ? <HomeFooter /> : <Footer layoutQuery={layoutQuery} />}
        /** **************************************
         * Style
         *************************************** */
        sx={sx}
      >
        <Main>{children}</Main>
      </LayoutSection>
    </SubscriptionModalProvider>
  );
}
