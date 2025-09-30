import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { CONFIG } from 'src/config-global';
import { stylesMode, varAlpha } from 'src/theme/styles';

import { MotionViewport, varFade } from 'src/components/animate';

import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { SectionTitle } from './components/section-title';
import { CircleSvg, FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

type Item = {
  icon: string;
  title: string;
  description?: string;
};

type Feature = {
  icon: string;
  pain: string;
  title: string;
  items: Item[];
  imgUrl: string;
};

// ----------------------------------------------------------------------

export function HomeFeatures({ sx, ...other }: BoxProps) {
  const Lines = ({ isFirst }: { isFirst: boolean }) => (
    <>
      {isFirst && (
        <>
          <FloatPlusIcon sx={{ top: 72, left: 72 }} />
          <FloatLine sx={{ top: 80, left: 0 }} />
        </>
      )}
      <FloatPlusIcon sx={{ bottom: 72, left: 72 }} />
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
      <FloatLine sx={{ bottom: 80, left: 0 }} />
    </>
  );

  const Description = ({ feature }: { feature: Feature }) => (
    <>
      <Typography
        variants={varFade({ distance: 24 }).inLeft}
        component={m.h6}
        variant="h6"
        sx={{ typography: 'overline', color: 'text.disabled', mb: 3 }}
      >
        {feature.pain}
      </Typography>

      <SectionTitle
        title={feature.title}
        isFullGradient={true}
        sx={{ mb: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      <Stack
        spacing={6}
        sx={{
          maxWidth: { sm: 560, md: 400 },
          mx: { xs: 'auto', md: 'unset' },
        }}
      >
        {feature.items.map((item) => (
          <Box
            component={m.div}
            key={item.title}
            variants={varFade({ distance: 24 }).inUp}
            gap={3}
            display="flex"
          >
            <Iconify icon={item.icon} sx={{ width: 40, height: 40 }} />
            <Stack spacing={1}>
              <Typography variant="h5" component="h6">
                {item.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Box variants={varFade({ distance: 24 }).inUp} component={m.div}>
        <Button
          component={RouterLink}
          href={paths.dashboard.root}
          color="inherit"
          size="large"
          variant="contained"
          startIcon={<Iconify width={24} icon="ph:rocket-launch-duotone" />}
          sx={{ mt: 5 }}
        >
          <span>Essayez gratuitement</span>
        </Button>
      </Box>
    </>
  );

  const Img = ({
    feature,
    isDescriptionRight,
  }: {
    feature: Feature;
    isDescriptionRight: boolean;
  }) => (
    <Stack
      component={m.div}
      variants={varFade({ distance: 24 })[isDescriptionRight ? 'inLeft' : 'inRight']}
      alignItems="center"
      justifyContent="center"
      sx={{ height: 1, position: 'relative' }}
    >
      <Box
        sx={{
          left: 0,
          width: 720,
          borderRadius: 2,
          position: 'absolute',
          bgcolor: 'background.default',
          boxShadow: (theme) =>
            `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
          [stylesMode.dark]: {
            boxShadow: (theme) =>
              `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
          },
        }}
      >
        <Box component="img" alt={feature.title} src={feature.imgUrl} sx={{ width: 720 }} />
      </Box>
    </Stack>
  );

  const LeftDescriptionFeature = ({ feature }: { feature: Feature }) => (
    <>
      <Grid xs={12} md={6} lg={7}>
        <Description feature={feature} />
      </Grid>
      <Grid md={6} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Img feature={feature} isDescriptionRight={false} />
      </Grid>
    </>
  );

  const RightDescriptionFeature = ({ feature }: { feature: Feature }) => (
    <>
      <Grid md={6} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Img feature={feature} isDescriptionRight={true} />
      </Grid>
      <Grid xs={12} md={6} lg={7}>
        <Description feature={feature} />
      </Grid>
    </>
  );

  return (
    <>
      {FEATURES.map((feature, index) => (
        <Box
          component="section"
          sx={{
            overflow: 'hidden',
            position: 'relative',
            pb: { xs: 10, md: 20 },
            ...(index === 0 && { pt: { xs: 10, md: 20 } }),
            ...sx,
          }}
          {...other}
        >
          <MotionViewport>
            <Lines isFirst={index === 0} />

            <Container sx={{ position: 'relative' }}>
              <Grid
                container
                columnSpacing={{ xs: 0, md: 8 }}
                sx={{ position: 'relative', zIndex: 9 }}
              >
                {index % 2 === 0 ? (
                  <LeftDescriptionFeature feature={feature} />
                ) : (
                  <RightDescriptionFeature feature={feature} />
                )}
              </Grid>

              <CircleSvg variants={varFade().in} sx={{ display: { xs: 'none', md: 'block' } }} />
            </Container>
          </MotionViewport>
        </Box>
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

const FEATURES: Feature[] = [
  {
    icon: 'mdi:check',
    title: 'Identification automatique des SaaS concurrents.',
    pain: 'Ne sais pas quoi faire ?',
    items: [
      {
        icon: 'mdi:magnify-scan',
        title: 'Identification automatique des SaaS concurrents.',
      },
      {
        icon: 'mdi:file-document-outline',
        title: 'Fiches complètes.',
        description: 'CA, employés, création, localisation.',
      },
      {
        icon: 'mdi:chart-box-outline',
        title: 'Vue claire du paysage concurrentiel.',
      },
    ],
    imgUrl: `${CONFIG.assetsDir}/assets/images/home/home-chart.webp`,
  },
  {
    icon: 'mdi:check',
    title: 'Analyser leur marché.',
    pain: 'Identification automatique des SaaS concurrents.',
    items: [
      {
        icon: 'mdi:check',
        title: 'Avis clients triés par thèmes & évolution dans le temps.',
      },
      {
        icon: 'mdi:file-document-outline',
        title: 'Comparatif des features, cibles et stratégies.',
      },
      {
        icon: 'mdi:chart-box-outline',
        title: 'Données fiables pour détecter forces & faiblesses.',
      },
    ],
    imgUrl: `${CONFIG.assetsDir}/assets/images/home/home-chart.webp`,
  },
  {
    icon: 'lucide:check-line',
    title: 'Surveiller leurs moves en temps réel.',
    pain: 'Identification automatique des SaaS concurrents.',
    items: [
      {
        icon: 'mdi:check',
        title: 'Avis clients',
        description: 'Avis clients triés par thèmes & évolution dans le temps..',
      },
      {
        icon: 'mdi:file-document-outline',
        title: 'Features',
        description: 'Comparatif des features, cibles et stratégies.',
      },
      {
        icon: 'mdi:chart-box-outline',
        title: 'Cibles',
        description: 'Données fiables pour détecter forces & faiblesses.',
      },
    ],
    imgUrl: `${CONFIG.assetsDir}/assets/images/home/home-chart.webp`,
  },
];
