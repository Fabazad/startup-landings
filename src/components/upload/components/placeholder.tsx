"use client";

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CONFIG } from 'src/config-global';
import { useTranslate } from 'src/locales';
import Image from 'next/image';

// ----------------------------------------------------------------------

export function UploadPlaceholder({ sx, ...other }: BoxProps) {
  const { t } = useTranslate();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={sx}
      {...other}
    >
      <Image src={`${CONFIG.assetsDir}/assets/illustrations/upload-image.svg`} width={200} height={200} alt="upload-illustration" />

      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Box sx={{ typography: 'h6' }}>{t('upload.placeholder.title')}</Box>
        <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
          {t('upload.placeholder.description')}
        </Box>
      </Stack>
    </Box>
  );
}
