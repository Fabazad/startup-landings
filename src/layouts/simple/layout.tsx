'use client';

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
import { useProductIdea } from 'src/app/product-idea-provider';
import React from 'react';



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

export function SimpleLayout({ sx, children, header, content, menuButtons }: SimpleLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

  const { name: productName } = useProductIdea();

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: <Box sx={{ display: 'flex', alignItems: 'center' }}><Logo /><Box
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
              {productName}
            </Box></Box>,
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
      {menuButtons && <Box bottom={0} left={0} right={0} width="100%" sx={{ display: { xs: 'fixed', md: 'none' }, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} width="100%" sx={{ '& > *': { minWidth: '100px' } }}>
          {menuButtons.map((button, index) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        </Box>
      </Box>}
    </LayoutSection>
  );
}
