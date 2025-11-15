import { Box, capitalize, Divider, Stack, StackProps, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade, varScale } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';
import { useTranslate } from 'src/locales';
import { Plan } from 'src/types/ProductIdea';
import { GetStartedButton } from '../components/get-started-button';
import { FloatLine, FloatXIcon } from '../components/svg-elements';

export const PlanCard = ({
  plan,
  planName,
  sx,
  ...other
}: StackProps & {
  plan: Plan;
  planName: 'basic' | 'premium' | 'ultimate';
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
      <Stack spacing={2.5} sx={{ minHeight: '200px' }}>
        {plan.included.map((option) => (
          <Stack
            key={`${planName}-${option}`}
            component={m.div}
            variants={varFade().in}
            spacing={1.5}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            <Iconify width={16} icon={'eva:checkmark-fill'} />
            {option}
          </Stack>
        ))}
      </Stack>
      <m.div variants={varFade({ distance: 24 }).inLeft}>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </m.div>
      <m.div variants={varFade({ distance: 24 }).inUp}>
        <GetStartedButton
          variant={!isPremiumPlan ? 'outlined' : 'contained'}
          buttonName={`get-started-plan-${planName}`}
        />
      </m.div>
    </Stack>
  );
};
