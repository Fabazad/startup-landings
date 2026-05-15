'use client';

import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { useTranslate } from 'src/locales';
import { useProductIdea } from 'src/app/product-idea-provider';

// ----------------------------------------------------------------------

export type HomeFooterProps = {
  sx?: SxProps<Theme>;
  hasPrivacyPolicy?: boolean;
};

export function HomeFooter({ sx = {}, hasPrivacyPolicy = false }: HomeFooterProps) {
  const { t } = useTranslate();

  const { name: productName, themeColor, logo } = useProductIdea();

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        // Footer is below the fold; let the browser skip layout/paint until
        // it scrolls into view. Reserve a stable intrinsic size so the page
        // height matches what the engine computes once it's rendered.
        contentVisibility: 'auto',
        containIntrinsicSize: '0 220px',
        ...sx,
      }}
    >
      <Container>
        <Logo themeColor={themeColor} logo={logo} productName={productName} />
        <Box sx={{ mt: 1, typography: 'caption' }}>
          © {t('common.allRightsReserved')}
          <br /> made by
          <Link href="https://onama.io/" underline="always">
            {' '}
            onama.io{' '}
          </Link>
        </Box>

        {hasPrivacyPolicy && (
          <Box sx={{ mt: 1 }}>
            <Link
              component={RouterLink}
              href="/privacy-policy"
              color="inherit"
              variant="caption"
              underline="always"
            >
              {t('common.privacyPolicy')}
            </Link>
          </Box>
        )}
      </Container>
    </Box>
  );
}
