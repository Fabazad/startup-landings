import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Logo } from 'src/components/logo';
import { getProductIdea } from 'src/app/getProductIdea';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { detectLanguage } from 'src/locales/server';
import { CONFIG } from 'src/config-global';
import { createClient } from '@supabase/supabase-js';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { HomeFooter } from './footer';
import { Main } from './main';
import { NavDesktop } from './nav/desktop/NavDesktop';
import { NavMobile } from './nav/mobile/NavMobile';

// Cache the blog count across requests; this otherwise blocks the landing TTFB.
const getBlogCount = unstable_cache(
  async (productName: string, lang: string) => {
    const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);
    const { count } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true })
      .eq('product_idea_id', productName)
      .eq('language', lang)
      .eq('published', true);
    return count ?? 0;
  },
  ['landing-blog-count'],
  { revalidate: 3600 }
);

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export async function LandingLayout({ sx = {}, children, header = {} }: MainLayoutProps) {
  const productIdea = await getProductIdea();
  if (!productIdea) {
    return <Main>{children}</Main>;
  }

  const { logo, themeColor, name: productName, extraLinks } = productIdea;

  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();
  const hasBlog = (await getBlogCount(productName, lang ?? 'fr')) > 0;

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
                  <Logo logo={logo} themeColor={themeColor} productName={productName} priority />
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
                <NavDesktop hasBlog={hasBlog} extraLinks={extraLinks} />
                <NavMobile hasBlog={hasBlog} extraLinks={extraLinks} />
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={<HomeFooter hasPrivacyPolicy={!!productIdea.privacyPolicy} />}
      /** **************************************
       * Style
       *************************************** */
      sx={sx}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
