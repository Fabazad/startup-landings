import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { MotionViewport, varFade } from 'src/components/animate';

import { useProductIdea } from 'src/app/product-idea-provider';
import { Feature } from 'src/types/ProductIdea';
import { CircleSvg } from '../components/svg-elements';
import { Description } from './description';
import { FeatureImage } from './feature-image';
import { Lines } from './lines';

export function LandingFeatures({ sx, ...other }: BoxProps) {
  const { features } = useProductIdea();
  const LeftDescriptionFeature = ({ feature }: { feature: Feature }) => (
    <>
      <Grid xs={12} md={6} lg={7}>
        <Description feature={feature} />
      </Grid>
      <Grid md={6} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <FeatureImage feature={feature} isDescriptionRight={false} />
      </Grid>
    </>
  );

  const RightDescriptionFeature = ({ feature }: { feature: Feature }) => (
    <>
      <Grid md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <FeatureImage feature={feature} isDescriptionRight={true} />
      </Grid>
      <Grid xs={12} md={6} lg={6}>
        <Description feature={feature} />
      </Grid>
    </>
  );

  return (
    <>
      {features.map((feature, index) => (
        <Box
          key={feature.title}
          component="section"
          sx={{
            overflow: 'hidden',
            position: 'relative',
            pb: { xs: 10, md: 10 },
            pt: { xs: 10, md: 20 },
            ...sx,
          }}
          {...other}
          id={`feature-${feature.id}`}
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
