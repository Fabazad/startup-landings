import { Box, Stack } from '@mui/material';
import { m } from 'framer-motion';
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
        boxShadow: (theme) =>
          `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
        [stylesMode.dark]: {
          boxShadow: (theme) =>
            `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
        },
        maxWidth: 500,
        maxHeight: 600,
      }}
    >
      <Box
        component="img"
        alt={feature.title}
        src={feature.imgUrl}
        sx={{ bgcolor: 'transparent', width: '100%', height: '100%' }}
      />
    </Box>
  </Stack>
);
