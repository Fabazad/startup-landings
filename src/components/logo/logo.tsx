
import Box from '@mui/material/Box';
import { CONFIG } from 'src/config-global';
import { PrimaryColor } from '../settings';

// ----------------------------------------------------------------------

export type LogoProps = {
  isSingle?: boolean;
  themeColor: PrimaryColor;
  logo: string;
  height?: number;
  width?: number
};

export const Logo = ({ isSingle = true, themeColor, logo, height, width }: LogoProps) => {

  const logoUrl = `${CONFIG.assetsDir}/logo/${themeColor}-${logo}.svg`;

  const baseSize = {
    width: width || 40,
    height: height || 40,
    ...(!isSingle && {
      width: width || 102,
      height: height || 36,
    }),
  };

  return (
    <Box
      aria-label="Logo"
      sx={{
        ...baseSize,
        flexShrink: 0,
        display: 'inline-flex',
        verticalAlign: 'middle',
        position: 'relative',
        textDecoration: 'none',
      }}
    >
      <Box
        component="img"
        src={logoUrl}
        width="100%"
        height="100%"
        aria-label="Insight Feed Logo"
        alt="Insight Feed Logo"
      />
    </Box>
  );
}

