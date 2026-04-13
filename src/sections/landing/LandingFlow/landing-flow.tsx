'use client';

import { Fragment } from 'react';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { MotionViewport, varFade } from 'src/components/animate';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Iconify } from 'src/components/iconify';
import { varAlpha } from 'src/theme/styles';
import { SectionTitle } from '../components/section-title';

// ----------------------------------------------------------------------

export function LandingFlow({ sx, ...other }: BoxProps) {
  const { flow } = useProductIdea();
  const { t } = useTranslation();

  if (!flow || flow.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{ pt: { xs: 10, md: 15 }, pb: { xs: 5, md: 10 }, position: 'relative', ...sx }}
      {...other}
      id="flow"
    >
      <MotionViewport>
        <Container>
          <SectionTitle
            caption={t('landing.flow.caption', { defaultValue: 'How it works' })}
            title={t('landing.flow.title', { defaultValue: 'Simple and fast' })}
            sx={{ mb: { xs: 8, md: 10 }, textAlign: 'center' }}
          />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 2, lg: 4 }}
            alignItems="stretch"
            justifyContent="center"
          >
            {flow.map((step, index) => (
              <Fragment key={step.title}>
                <Box sx={{ flex: 1 }}>
                  <Box
                    component={m.div}
                    variants={varFade({ distance: 24 }).inUp}
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      pt: 5,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      boxShadow: (theme) => theme.customShadows.z8,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: { xs: '50%', md: 24 },
                        transform: { xs: 'translateX(-50%)', md: 'none' },
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        typography: 'subtitle2',
                        boxShadow: (theme) => theme.customShadows.z8,
                      }}
                    >
                      {index + 1}
                    </Box>

                    <Box
                      sx={{
                        mb: 3,
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: (theme) => varAlpha(theme.vars.palette.primary.main, 0.08),
                        color: 'primary.main',
                      }}
                    >
                      <Iconify icon={step.icon} width={40} />
                    </Box>

                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {step.title}
                    </Typography>

                    <Box
                      sx={{
                        color: 'text.secondary',
                        typography: 'body1',
                        '& a': { color: 'primary.main', textDecoration: 'underline' },
                        '& p': { m: 0 },
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.description}</ReactMarkdown>
                    </Box>
                  </Box>
                </Box>

                {index < flow.length - 1 && (
                  <Box
                    component={m.div}
                    variants={varFade({ distance: 24 }).in}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    <Iconify
                      icon="eva:arrow-ios-downward-fill"
                      width={40}
                      sx={{ display: { xs: 'block', md: 'none' } }}
                    />
                    <Iconify
                      icon="eva:arrow-ios-forward-fill"
                      width={40}
                      sx={{ display: { xs: 'none', md: 'block' } }}
                    />
                  </Box>
                )}
              </Fragment>
            ))}
          </Stack>
        </Container>
      </MotionViewport>
    </Box>
  );
}
