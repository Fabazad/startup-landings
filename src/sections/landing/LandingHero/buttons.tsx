import { Box, Stack } from '@mui/material';
import { TryForFreeButton } from '../components/try-for-free-button';
import { AnimatedDiv } from './animated-div';
import { useProductIdea } from 'src/app/product-idea-provider';
import { GetStartedButton } from '../components/get-started-button';

export const Buttons = () => {
  const { plans, isReady } = useProductIdea();
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={{ xs: 1.5, sm: 2 }}>
      <AnimatedDiv>
        <Stack alignItems="center" spacing={2.5}>
          {plans ? <TryForFreeButton buttonName="try-for-free-hero" /> : <GetStartedButton size='large' buttonName="get-started-hero" />}
        </Stack>
      </AnimatedDiv>
    </Box>
  );
};
