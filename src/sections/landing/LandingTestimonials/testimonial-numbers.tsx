import { Box, Stack } from '@mui/material';
import { m } from 'framer-motion';
import { AnimateCountUp, varFade } from 'src/components/animate';
import { TextGradient } from '../components/text-gradient';
import { HorizontalDivider } from './horizontal-divider';
import { VerticalDivider } from './vertical-divider';

export const TestimonialNumbers = () => {
  return (
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative' }}>
      <HorizontalDivider position="top" />

      <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} divider={<VerticalDivider />}>
        {[
          { label: 'Inscriptions', value: 12.121 },
          { label: 'Reviews', value: 260 },
          { label: 'Review rate', value: 4.7 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <AnimateCountUp
                to={item.value}
                unit={item.label === 'Inscriptions' ? 'k+' : '+'}
                toFixed={item.label === 'Reviews' ? 0 : 1}
                sx={{
                  fontWeight: 'fontWeightBold',
                  fontSize: { xs: 40, md: 64 },
                  lineHeight: { xs: 50 / 40, md: 80 / 64 },
                  fontFamily: (theme) => theme.typography.fontSecondaryFamily,
                }}
              />
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Box
                component="span"
                sx={(theme) => ({
                  opacity: 0.8,
                  typography: 'h5',
                })}
              >
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
