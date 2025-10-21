import { Box, Stack } from '@mui/material';
import { TryForFreeButton } from 'src/components/try-for-free-button';
import { AnimatedDiv } from './animated-div';

export const Buttons = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={{ xs: 1.5, sm: 2 }}>
      <AnimatedDiv>
        <Stack alignItems="center" spacing={2.5}>
          <TryForFreeButton />
        </Stack>
      </AnimatedDiv>
    </Box>
  );
};
