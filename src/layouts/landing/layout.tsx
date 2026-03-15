import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Logo } from 'src/components/logo';
import { getProductIdea } from 'src/app/getProductIdea';
import Link from 'next/link';
import { detectLanguage } from 'src/locales/server';
import { CONFIG } from 'src/config-global';
import { createClient } from '@supabase/supabase-js';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { HomeFooter } from './footer';
import { Main } from './main';
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

export async function LandingLayout({ sx = {}, children, header = {} }: MainLayoutProps) {
  const { logo, themeColor, name: productName } = await getProductIdea();

  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
  const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

  const { count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact', head: true })
    .eq('product_idea_id', productName)
    .eq('language', lang ?? 'fr')
    .eq('published', true);

  const hasBlog = count ? count > 0 : false;

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
                {/* -- Logo -- */}
                <Link href="/" style={{ textDecoration: 'none', display: 'flex' }}>
                  <Logo logo={logo} themeColor={themeColor} productName={productName} />
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
                <NavDesktop hasBlog={hasBlog} />
                <NavMobile hasBlog={hasBlog} />
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
