'use client';

import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { layoutClasses } from '../classes';

// ----------------------------------------------------------------------

export type LayoutSectionProps = {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
};

export function LayoutSection({
  sx = {},
  cssVars = {},
  children = null,
  footerSection = null,
  headerSection = null,
  sidebarSection = null,
}: LayoutSectionProps) {
  const hasOverrides = cssVars && Object.keys(cssVars).length > 0;

  const inputGlobalStyles = hasOverrides ? (
    <GlobalStyles
      styles={{
        body: cssVars,
      }}
    />
  ) : null;

  return (
    <>
      {inputGlobalStyles}

      <Box id="root__layout" className={layoutClasses.root} sx={sx}>
        {sidebarSection ? (
          <>
            {sidebarSection}
            <Box
              display="flex"
              flex="1 1 auto"
              flexDirection="column"
              className={layoutClasses.hasSidebar}
            >
              {headerSection}
              {children}
              {footerSection}
            </Box>
          </>
        ) : (
          <>
            {headerSection}
            {children}
            {footerSection}
          </>
        )}
      </Box>
    </>
  );
}
