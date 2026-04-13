'use client';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { MotionViewport, varFade, varContainer } from 'src/components/animate';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Iconify } from 'src/components/iconify';
import { varAlpha } from 'src/theme/styles';
import { SectionTitle } from '../components/section-title';

// ----------------------------------------------------------------------

export function LandingBenefits({ sx, ...other }: BoxProps) {
  const { benefits } = useProductIdea();
  const { t } = useTranslation();

  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 5, md: 10 }, position: 'relative', ...sx }}
      {...other}
      id="benefits"
    >
      <MotionViewport disableAnimate={false}>
        <Container>
          <SectionTitle
            caption={t('landing.benefits.caption', { defaultValue: 'Why choose us' })}
            title={t('landing.benefits.title', { defaultValue: 'Everything you need' })}
            sx={{ mb: { xs: 8, md: 10 }, textAlign: 'center' }}
          />

          <Box
            component={m.div}
            variants={varContainer({ staggerIn: 0.05 })}
            sx={{
              display: 'grid',
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
              },
            }}
          >
            {benefits.map((benefit) => (
              <Box
                key={benefit.title}
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: (theme) => theme.customShadows.z8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: (theme) => theme.customShadows.z20,
                  },
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 1.5,
                    flexShrink: 0,
                    bgcolor: (theme) => varAlpha(theme.vars.palette.primary.main, 0.1),
                    color: 'primary.main',
                  }}
                >
                  <Iconify icon={benefit.icon} width={24} />
                </Stack>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5, lineHeight: 1.3 }}>
                    {benefit.title}
                  </Typography>

                  {benefit.description && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                      {benefit.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}
