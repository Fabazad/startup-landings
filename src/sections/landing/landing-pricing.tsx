import type { BoxProps } from '@mui/material/Box';
import type { StackProps } from '@mui/material/Stack';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';

import { MotionViewport, varFade, varScale } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatXIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function LandingPricing({ sx, ...other }: BoxProps) {
  const tabs = useTabs(PLANS_NEW[0].license);

  const renderDescription = (
    <SectionTitle
      caption="plans"
      title="Transparent"
      txtGradient="pricing"
      description="Choose from flexible pricing options designed to fit your business needs and budget with no hidden fees."
      sx={{ mb: 8, textAlign: 'center' }}
    />
  );

  const renderContentDesktop = (
    <Box gridTemplateColumns="repeat(3, 1fr)" sx={{ display: { xs: 'none', md: 'grid' } }}>
      {PLANS_NEW.map((plan) => (
        <PlanCard
          key={plan.license}
          plan={plan}
          sx={(theme) => ({
            ...(plan.license === PLANS_NEW[1].license && {
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
        {PLANS_NEW.map((tab) => (
          <Tab key={tab.license} value={tab.license} label={tab.license} />
        ))}
      </Tabs>

      <Box
        sx={{
          width: 1,
          borderRadius: 2,
          border: (theme) => `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
        }}
      >
        {PLANS_NEW.map(
          (tab) => tab.license === tabs.value && <PlanCard key={tab.license} plan={tab} />
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

// ----------------------------------------------------------------------

type PlanCardProps = StackProps & {
  plan: {
    license: string;
    price: number;
    included: string[];
  };
};

function PlanCard({ plan, sx, ...other }: PlanCardProps) {
  const standardLicense = plan.license === PLANS_NEW[0].license;

  const plusLicense = plan.license === PLANS_NEW[1].license;

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
      {plusLicense && renderLines}

      <Stack direction="row" alignItems="center">
        <Stack flexGrow={1}>
          <m.div variants={varFade({ distance: 24 }).inLeft}>
            <Typography variant="h4" component="h6">
              {plan.license}
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
                ...(standardLicense && { bgcolor: 'primary.main' }),
                ...(plusLicense && { bgcolor: 'secondary.main' }),
              }}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade({ distance: 24 }).inLeft}>
          <Box component="span" sx={{ typography: 'h3' }}>
            ${plan.price}
          </Box>
        </m.div>
      </Stack>

      <Stack spacing={2.5}>
        {plan.included.map((option) => (
          <Stack
            key={`${plan.license}-${option}`}
            component={m.div}
            variants={varFade().in}
            spacing={1.5}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            <Iconify width={16} icon="eva:checkmark-fill" />
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
          variant={plusLicense ? 'contained' : 'outlined'}
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
}

// ----------------------------------------------------------------------

const PLANS_NEW = [
  {
    license: 'Standard-1',
    price: 69,
    included: [
      'One end products',
      '12 months updates',
      '6 months of support',
      'One-time payments',
      'Lifetime perpetual license.',
    ],
  },
  {
    license: 'Standard-2',
    price: 129,
    included: [
      'One end products',
      '12 months updates',
      '6 months of support',
      'One-time payments',
      'Lifetime perpetual license.',
    ],
  },
  {
    license: 'Standard-3',
    price: 599,
    included: [
      'One end products',
      '12 months updates',
      '6 months of support',
      'One-time payments',
      'Lifetime perpetual license.',
    ],
  },
];
