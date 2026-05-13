import Box from '@mui/material/Box';
import Image from 'next/image';
import { CONFIG } from 'src/config-global';
import { PrimaryColor } from '../settings';

// ----------------------------------------------------------------------

export type LogoProps = {
  isSingle?: boolean;
  themeColor: PrimaryColor;
  logo: string;
  productName: string;
  height?: number;
  width?: number;
  priority?: boolean;
};

export function Logo({
  isSingle = true,
  themeColor,
  logo,
  productName,
  height = 40,
  width = 40,
  priority = false,
}: LogoProps) {
  const logoUrl = `${CONFIG.assetsDir}/logo/${themeColor}-${logo}.webp`;

  const resolvedWidth = !isSingle && width === 40 ? 102 : width;
  const resolvedHeight = !isSingle && height === 40 ? 36 : height;

  return (
    <Box
      aria-label={`${productName} Logo`}
      sx={{
        width: resolvedWidth,
        height: resolvedHeight,
        flexShrink: 0,
        display: 'inline-flex',
        verticalAlign: 'middle',
        position: 'relative',
        textDecoration: 'none',
      }}
    >
      <Image
        src={logoUrl}
        width={resolvedWidth}
        height={resolvedHeight}
        alt={`${productName} Logo`}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={`${resolvedWidth}px`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  );
}
