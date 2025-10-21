import { Box, Button, capitalize, Divider, Stack, StackProps, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade, varScale } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';
import { useTranslate } from 'src/locales';
import { paths } from 'src/routes/paths';
import { Plan } from 'src/types/ProductIdea';
import { FloatLine, FloatXIcon } from '../components/svg-elements';

export const PlanCard = ({
  plan,
  planName,
  allIncludedOptions,
  sx,
  ...other
}: StackProps & {
  plan: Plan;
  planName: 'basic' | 'premium' | 'ultimate';
  allIncludedOptions: string[];
}) => {
  const { t, currentLang } = useTranslate();
  const isBasicPlan = planName === 'basic';
  const isPremiumPlan = planName === 'premium';

  const renderLines = (
    <>
      <FloatLine vertical sx={{ top: -64, left: 0, height: 'calc(100% + (64px * 2))' }} />
      <FloatLine vertical sx={{ top: -64, right: 0, height: 'calc(100% + (64px * 2))' }} />
      <FloatXIcon sx={{ top: -8, left: -8 }} />
      <FloatXIcon sx={{ top: -8, right: -8 }} />
      <FloatXIcon sx={{ bottom: -8, left: -8 }} />
      <FloatXIcon sx={{ bottom: -8, right: -8 }} />
    </>
  );

  return (
    <Stack
      spacing={5}
      component={MotionViewport}
      sx={{
        px: 6,
        py: 8,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      {isPremiumPlan && renderLines}

      <Stack direction="row" alignItems="center">
        <Stack flexGrow={1}>
          <m.div variants={varFade({ distance: 24 }).inLeft}>
            <Typography variant="h4" component="h6">
              {capitalize(planName)}
            </Typography>
          </m.div>

          <m.div variants={varScale({ distance: 24 }).inX}>
            <Box
              sx={{
                width: 32,
                height: 6,
                opacity: 0.24,
                borderRadius: 1,
                bgcolor: 'error.main',
                ...(isBasicPlan && { bgcolor: 'primary.main' }),
                ...(isPremiumPlan && { bgcolor: 'secondary.main' }),
              }}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade({ distance: 24 }).inLeft}>
          <Box component="span" sx={{ typography: 'h3' }}>
            {currentLang.value === 'en' && '$'}
            {plan.price}
            {currentLang.value === 'fr' && '€'}
            <Typography component="span">/{t('landing.pricing.month')}</Typography>
          </Box>
        </m.div>
      </Stack>

      <Stack spacing={2.5}>
        {allIncludedOptions.map((option) => (
          <Stack
            key={`${planName}-${option}`}
            component={m.div}
            variants={varFade().in}
            spacing={1.5}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            <Iconify
              width={16}
              icon={plan.included.includes(option) ? 'eva:checkmark-fill' : 'eva:close-fill'}
            />
            {option}
          </Stack>
        ))}

        <m.div variants={varFade({ distance: 24 }).inLeft}>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </m.div>
      </Stack>

      <m.div variants={varFade({ distance: 24 }).inUp}>
        <Button
          fullWidth
          variant={isPremiumPlan ? 'contained' : 'outlined'}
          color="inherit"
          size="large"
          target="_blank"
          rel="noopener"
          href={paths.minimalStore}
        >
          Get started
        </Button>
      </m.div>
    </Stack>
  );
};
