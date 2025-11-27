import type { BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';
import { CONFIG } from 'src/config-global';
import { logoClasses } from './classes';
import { PrimaryColor } from '../settings';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
  themeColor: PrimaryColor;
  logo: string;
  productName: string;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  async (
    { width, href = '/', height, isSingle = true, disableLink = false, className, themeColor, logo, productName, sx, ...other },
    ref
  ) => {


    const logoUrl = `${CONFIG.assetsDir}/logo/${themeColor}-${logo}.svg`;

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
        <Box
          component="img"
          src={logoUrl}
          width="100%"
          height="100%"
          aria-label="Insight Feed Logo"
          alt="Insight Feed Logo"
        />
        <Box
          component="h4"
          typography="h4"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: 'text.primary',
            mt: 1,
            ml: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {productName}
        </Box>
      </Box>
    );
  }
);
