"use client";

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';

import { MotionViewport } from 'src/components/animate';

import { capitalize } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useProductIdea } from 'src/app/product-idea-provider';
import { PLANS_SAMPLE } from 'src/ProductIdeas/InsightFeed/plans-sample';
import { SectionTitle } from '../components/section-title';
import { FloatLine } from '../components/svg-elements';
import { PlanCard } from './plan-card';

// ----------------------------------------------------------------------

export function LandingPricing({ sx, ...other }: BoxProps) {
  const { t } = useTranslation();

  const tabs = useTabs('basic');

  const plans = useProductIdea().plans;

  if (!plans) {
    return null;
  }

  const renderDescription = (
    <SectionTitle
      caption="plans"
      title={t('landing.pricing.titlePart1')}
      txtGradient={t('landing.pricing.titlePart2')}
      description={t('landing.pricing.description')}
      sx={{ mb: 8, textAlign: 'center' }}
    />
  );

  const renderContentDesktop = (
    <Box
      gridTemplateColumns="repeat(3, 1fr)"
      sx={{ display: { xs: 'none', md: 'grid' } }}
      id="pricing"
    >
      {Object.entries(plans).map(([planName, plan]) => (
        <PlanCard
          key={planName}
          planName={planName as 'basic' | 'premium' | 'ultimate'}
          plan={plan}
          sx={(theme) => ({
            ...(planName === 'premium' && {
              [theme.breakpoints.down(1440)]: {
                borderLeft: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                borderRight: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
              },
            }),
          })}
        />
      ))}
    </Box>
  );

  const renderContentMobile = (
    <Stack spacing={5} alignItems="center" sx={{ display: { md: 'none' } }}>
      <Tabs
        value={tabs.value}
        onChange={tabs.onChange}
        sx={{
          boxShadow: (theme) =>
            `0px -2px 0px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)} inset`,
        }}
      >
        {Object.keys(PLANS_SAMPLE).map((planName) => (
          <Tab key={planName} value={planName} label={capitalize(planName)} />
        ))}
      </Tabs>

      <Box
        sx={{
          width: 1,
          borderRadius: 2,
          border: (theme) => `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
        }}
      >
        {Object.entries(plans).map(
          ([planName, plan]) =>
            planName === tabs.value && (
              <PlanCard
                key={planName}
                planName={planName as 'basic' | 'premium' | 'ultimate'}
                plan={plan}
              />
            )
        )}
      </Box>
    </Stack>
  );

  return (
    <Box component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other} id="pricing">
      <MotionViewport>
        <FloatLine vertical sx={{ top: 0, left: 80 }} />

        <Container>{renderDescription}</Container>

        <Box
          sx={(theme) => ({
            position: 'relative',
            '&::before, &::after': {
              width: 64,
              height: 64,
              content: "''",
              [theme.breakpoints.up(1440)]: {
                display: 'block',
              },
            },
          })}
        >
          <Container>{renderContentDesktop}</Container>

          <FloatLine sx={{ top: 64, left: 0 }} />
          <FloatLine sx={{ bottom: 64, left: 0 }} />
        </Box>

        <Container>{renderContentMobile}</Container>
      </MotionViewport>
    </Box>
  );
}
