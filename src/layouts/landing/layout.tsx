import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Logo } from 'src/components/logo';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { HomeFooter } from './footer';
import { Main } from './main';
import { Button, Stack } from '@mui/material';
import { GetStartedButton } from '../../sections/landing/components/get-started-button';
import { LanguageButton } from '../../sections/landing/components/language-button';
import { NavDesktop } from './nav/desktop/NavDesktop';
import { NavMobile } from './nav/mobile/NavMobile';
import { ThemeButton } from '../components/theme-button';
import { getProductIdea } from 'src/app/getProductIdea';
import { SignInButton } from 'src/sections/landing/components/sign-in-button';
import Link from 'next/link';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export async function LandingLayout({ sx, children, header }: MainLayoutProps) {

  const { logo, themeColor, name: productName, isReady } = await getProductIdea();

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
                <Link href="/" style={{ textDecoration: "none", display: "flex" }}>
                  <Logo logo={logo} themeColor={themeColor} />
                  <Box
                    component="h4"
                    typography="h4"
                    sx={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'text.primary',
                      my: 0,
                      ml: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {productName}
                  </Box>
                </Link>
              </>
            ),
            rightArea: (
              <>
                {/* -- Nav desktop -- */}
                <NavDesktop />

                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                  <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {isReady ? <SignInButton /> : <GetStartedButton buttonName="get-started-nav" />}
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
