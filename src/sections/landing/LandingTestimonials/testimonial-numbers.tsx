import { Box, Stack } from '@mui/material';
import { m } from 'framer-motion';
import { AnimateCountUp, varFade } from 'src/components/animate';
import { TextGradient } from '../components/text-gradient';
import { HorizontalDivider } from './horizontal-divider';
import { VerticalDivider } from './vertical-divider';
import { useProductIdea } from 'src/app/product-idea-provider';

export const TestimonialNumbers = () => {

  const { testimonialNumbers } = useProductIdea()

  return (
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative' }}>
      <HorizontalDivider position="top" />

      <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} divider={<VerticalDivider />}>
        {testimonialNumbers.map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <AnimateCountUp
                to={item.value}
                toFixed={1}
                unit={item.unit}
                sx={{
                  fontWeight: 'fontWeightBold',
                  fontSize: { xs: 40, md: 64 },
                  lineHeight: { xs: 50 / 40, md: 80 / 64 },
                  fontFamily: (theme) => theme.typography.fontSecondaryFamily,
                }}
              />
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Box component="span" sx={{ opacity: 0.8, typography: 'h5' }}>
                <TextGradient>{item.label}</TextGradient>
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>

      <HorizontalDivider position="bottom" />
    </Stack>
  );
};
