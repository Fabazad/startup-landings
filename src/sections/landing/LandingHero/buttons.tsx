'use client';

import { Box, Stack } from '@mui/material';
import { TryForFreeButton } from '../components/try-for-free-button';
import { AnimatedDiv } from './animated-div';
import { GetStartedButton } from '../components/get-started-button';

export function Buttons({ hasPlans }: { hasPlans: boolean }) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={{ xs: 1.5, sm: 2 }}
      sx={{ position: 'relative', zIndex: 120 }}
    >
      <AnimatedDiv>
        <Stack alignItems="center" spacing={2.5}>
          {hasPlans ? (
            <TryForFreeButton buttonName="try-for-free-hero" />
          ) : (
            <GetStartedButton size="large" buttonName="get-started-hero" />
          )}
        </Stack>
      </AnimatedDiv>
    </Box>
  );
}
