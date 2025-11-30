import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/config-global';
import { Logo } from 'src/components/logo';
import { Section } from './section';
import { Main, Content } from './main';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { LanguageButton } from 'src/sections/landing/components/language-button';
import { ThemeButton } from '../components/theme-button';
import { getProductIdea } from 'src/app/getProductIdea';
import { NavDesktop } from '../landing/nav/desktop/NavDesktop';
import { NavMobile } from '../landing/nav/mobile/NavMobile';
import Link from 'next/link';

// ----------------------------------------------------------------------

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  section?: {
    title?: string;
    imgUrl?: string;
    subtitle?: string;
  };
};

export async function AuthSplitLayout({ sx, section, children, header }: AuthSplitLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

  const { name: productName, themeColor, logo } = await getProductIdea()

  return (
    <LayoutSection
      headerSection={
        /** **************************************
         * Header
         *************************************** */
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' }, ...header?.sx }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
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
                <NavDesktop showConnection={false} />
                <NavMobile showConnection={false} />
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px' }}
      sx={sx}
    >
      <Main layoutQuery={layoutQuery}>
        <Section
          title={section?.title}
          layoutQuery={layoutQuery}
          imgUrl={section?.imgUrl}
          method={CONFIG.auth.method}
          subtitle={section?.subtitle}
          methods={[
            {
              label: 'Supabase',
              path: paths.auth.signIn,
              icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-supabase.svg`,
            },
          ]}
        />
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}
