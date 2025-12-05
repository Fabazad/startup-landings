import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { Logo } from 'src/components/logo';
import { Main, CompactContent } from './main';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { LanguageButton } from 'src/sections/landing/components/language-button';
import { AccountDrawer } from '../components/account-drawer';
import { ThemeButton } from '../components/theme-button';
import React from 'react';
import { getProductIdea } from 'src/app/getProductIdea';
import Link from 'next/link';

// ----------------------------------------------------------------------

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  content?: {
    compact?: boolean;
  };
  menuButtons?: Array<React.ReactNode>;
};

export async function SimpleLayout({ sx, children, header, content, menuButtons }: SimpleLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

  const { logo, themeColor, name: productName, id: productId } = await getProductIdea();

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
            leftArea: <>
              <Link href={`/${productId}`} style={{ textDecoration: "none", display: "flex" }}>
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
            </>,
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {menuButtons?.map((button, index) => (
                    <React.Fragment key={index}>{button}</React.Fragment>
                  ))}
                </Box>
                <ThemeButton />
                <LanguageButton />
                <AccountDrawer />
              </Box>
            )
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
      cssVars={{
        '--layout-simple-content-compact-width': '448px',
      }}
      sx={sx}
    >
      <Main>
        {content?.compact ? (
          <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
        ) : (
          children
        )}
      </Main>
      {menuButtons && (
        <Box bottom={0} left={0} right={0} width="100%" sx={{ bgcolor: 'background.default', position: 'sticky', borderTop: '1px solid', borderColor: 'divider', display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'center', gap: 1, '& > *': { minWidth: '100px' } }} >
          {
            menuButtons.map((button, index) => (
              <React.Fragment key={index}>{button}</React.Fragment>
            ))
          }
        </Box>)
      }
    </LayoutSection >
  );
}
