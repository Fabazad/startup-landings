import { Box, Stack } from '@mui/material';
import { m } from 'framer-motion';
import Image from 'next/image';
import { varFade } from 'src/components/animate';
import { stylesMode, varAlpha } from 'src/theme/styles';
import { Feature } from 'src/types/ProductIdea';

export const FeatureImage = ({
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
    bgcolor="transparent"
  >
    <Box
      sx={{
        left: 0,
        width: 720,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'transparent',
        overflow: 'hidden',
        maxWidth: 500,
        maxHeight: 600,
      }}
    >
      <Image
        alt={feature.title || 'Feature image'}
        src={feature.imgUrl}
        width={500}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
        loading="lazy"
      />
    </Box>
  </Stack>
);
