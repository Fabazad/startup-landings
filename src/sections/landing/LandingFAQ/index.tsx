"use client";

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { RouterLink } from 'src/routes/components';

import { useProductIdea } from 'src/app/product-idea-provider';
import { MotionViewport, varFade } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const LandingFAQ = ({ sx, ...other }: BoxProps) => {
  const { faq } = useProductIdea();
  const { t, i18n } = useTranslation();

  if (!faq || faq.pages.length === 0) {
    return null;
  }

  const currentLang = (i18n.language || 'en') as 'en' | 'fr';

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 10, md: 15 },
        ...sx,
      }}
      {...other}
    >
      <MotionViewport>
        <Container>
          <Box sx={{ mb: { xs: 5, md: 10 }, textAlign: 'center' }}>
            <m.div variants={varFade().inUp}>
              <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                FAQ
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Typography variant="h2" sx={{ my: 3 }}>
                {t('landing.faq.title')}
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Typography sx={{ color: 'text.secondary' }}>
                {t('landing.faq.description')}
              </Typography>
            </m.div>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {faq.pages.map((page) => {
              const icon = page.icon;
              const title = page.hero.title;
              const slug = page.slug[currentLang];

              return (
                <Grid key={page.id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                  <m.div variants={varFade().inUp} style={{ width: '100%' }}>
                    <Card
                      component={RouterLink}
                      href={`/faq/${slug}`}
                      sx={{
                        p: 3,
                        py: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'text.primary',
                        height: '100%',
                        transition: (theme) => theme.transitions.create('all'),
                        '&:hover': {
                          boxShadow: (theme) => theme.customShadows.z24,
                        },
                      }}
                    >
                      <Iconify icon={icon} width={48} sx={{ mb: 3, color: 'primary.main' }} />
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        {title}
                      </Typography>
                    </Card>
                  </m.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
};