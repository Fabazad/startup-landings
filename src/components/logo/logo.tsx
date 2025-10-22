'use client';

import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

import { useProductIdea } from 'src/app/product-idea-provider';
import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { width, href = '/', height, isSingle = true, disableLink = false, className, sx, ...other },
    ref
  ) => {
    const { logoUrl, name } = useProductIdea();

    const baseSize = {
      width: width ?? 40,
      height: height ?? 40,
      ...(!isSingle && {
        width: width ?? 102,
        height: height ?? 36,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          position: 'relative',
          textDecoration: 'none',
          ...sx,
        }}
        {...other}
      >
        <Box alt="Single logo" component="img" src={logoUrl} width="100%" height="100%" />
        <Box
          component="h4"
          typography="h4"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: 'text.primary',
            ml: 2,
            mt: { xs: 0.5, md: 1 },
          }}
        >
          {name}
        </Box>
      </Box>
    );
  }
);
