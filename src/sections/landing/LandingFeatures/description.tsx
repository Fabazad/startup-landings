import { Box, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';
import { Feature } from 'src/types/ProductIdea';
import { SectionTitle } from '../components/section-title';
import { TryForFreeButton } from '../components/try-for-free-button';
import { GetStartedButton } from '../components/get-started-button';
import { useProductIdea } from 'src/app/product-idea-provider';

export const Description = ({ feature }: { feature: Feature }) => {
  const { plans } = useProductIdea();

  return (
    <>
      <SectionTitle
        title={feature.title}
        isFullGradient={true}
        sx={{ mb: { xs: 2, md: 3 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      <Typography
        variants={varFade({ distance: 24 }).inLeft}
        component={m.h6}
        variant="h6"
        sx={{
          typography: 'overline',
          color: 'text.disabled',
          mb: { xs: 6, md: 8 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {feature.pain}
      </Typography>

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
      <Box
        variants={varFade({ distance: 24 }).inUp}
        component={m.div}
        sx={{ mt: 8, textAlign: { xs: 'center', md: 'left' } }}
      >
        {plans ? <TryForFreeButton buttonName={`try-for-free-feature-${feature.title}`} /> : <GetStartedButton buttonName={`get-started-feature-${feature.title}`} />}
      </Box>
    </>
  )
}
