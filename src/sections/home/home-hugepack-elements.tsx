import type { BoxProps } from '@mui/material/Box';
import type { MotionProps, MotionValue } from 'framer-motion';

import { m, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { forwardRef, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled, useTheme } from '@mui/material/styles';

import { useClientRect } from 'src/hooks/use-client-rect';

import { MotionViewport, varFade } from 'src/components/animate';

import { Avatar, Rating, Stack } from '@mui/material';
import { _mock } from 'src/_mock';
import { maxLine } from 'src/theme/styles';
import { fToNow } from 'src/utils/format-time';
import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleLeftIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function SocialProofs({ sx, ...other }: BoxProps) {
  const renderLines = (
    <>
      <FloatTriangleLeftIcon sx={{ top: 130, left: 80, opacity: 0.4 }} />
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  return (
    <Box component="section" sx={{ pt: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Grid
            container
            disableEqualOverflow
            rowSpacing={{ xs: 3, md: 0 }}
            columnSpacing={{ xs: 0, md: 8 }}
          >
            <Grid xs={12} md={6} lg={7}>
              <SectionTitle title="Ils nous ont déjà" txtGradient="adopté" sx={{ mt: 3 }} />
            </Grid>

            <Grid xs={12} md={6} lg={5}>
              <m.div variants={varFade({ distance: 24 }).inUp}>
                <Typography
                  sx={{ color: 'text.disabled', fontSize: { md: 20 }, lineHeight: { md: 36 / 20 } }}
                >
                  <Box component="span" sx={{ color: 'text.primary' }}>
                    Déjà utilisé par des équipes Produit, Marketing & Growth qui veulent garder une
                    longueur d’avance.
                  </Box>
                </Typography>
              </m.div>
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>

      <ScrollContent />
    </Box>
  );
}

// ----------------------------------------------------------------------
const base = (index: number) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
});

const TESTIMONIALS = [
  {
    ...base(1),
    category: 'Design Quality',
    content: `The quality of this template is very good, the TypeScript files are neat and the communication with the team behind this template is very good! I would recommend this template for any kind of project, as they implement new features every now and then and enhance their design. I will definitely be using more templates from this team and re-purchasing this template for other projects.`,
    postedAt: 'April 20, 2024 23:15:30',
  },
  {
    ...base(2),
    category: 'Design Quality',
    content: `Amazing. I've never purchased complete front ends before, but I'll definitely be doing this again!`,
    postedAt: 'March 19, 2024 23:15:30',
  },
  {
    ...base(3),
    category: 'Code Quality',
    content: `Clean & Complete (Design & Code). Thansk Minimal team :)`,
    postedAt: 'April 19, 2023 23:15:30',
  },
  {
    ...base(4),
    category: 'Customer Support',
    content: `Thanks to Minimal for customer support with email. I solved the problem. And the code quality is good, too.`,
    postedAt: 'May 19, 2023 23:15:30',
  },
  {
    ...base(5),
    category: 'Customer Support',
    content:
      'Great UI kit, really beautiful as well. Also the customer support is very warm-hearted. However, I hope the components and themes can be provided as a separated project (package).',
    postedAt: 'June 19, 2023 23:15:30',
  },
  {
    ...base(6),
    category: 'Design Quality',
    content: 'I would never have been able to create all these beautifull components myself!',
    postedAt: 'July 19, 2023 23:15:30',
  },
  {
    ...base(7),
    category: 'Code Quality',
    content:
      'The quality of this template is excellent. However, as an individual, the cost of obtaining the TypeScript Source version is beyond my means. Despite my strong desire to acquire it, my limited personal budget does not allow me to do so.',
    postedAt: 'August 19, 2023 23:15:30',
  },
  {
    ...base(8),
    category: 'Customizability',
    content:
      'The design and code quality are impressive. Regular updates and excellent customer support are major advantages.',
    postedAt: 'September 19, 2023 23:15:30',
  },
];

const Testimonials = TESTIMONIALS.map((item) => (
  <Box sx={{ flex: 1, textOverflow: 'ellipsis' }}>
    <Stack key={item.id} component={m.div} variants={varFade().in}>
      <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
        <Rating size="small" name="read-only" value={item.rating} precision={0.5} readOnly />
        {item.category}
      </Stack>

      <Typography
        sx={(theme) => ({
          ...maxLine({ line: 4, persistent: theme.typography.body1 }),
          mt: 2,
          mb: 3,
        })}
      >
        {item.content}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={item.name} src={item.avatar} sx={{ width: 48, height: 48 }} />
        <Stack sx={{ typography: 'subtitle1' }}>
          <Box component="span">{item.name}</Box>
          <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
            {fToNow(new Date(item.postedAt))}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  </Box>
));

const StyledRoot = styled(
  forwardRef((props: BoxProps & MotionProps, ref) => <Box ref={ref} component={m.div} {...props} />)
)(({ theme }) => ({
  zIndex: 9,
  position: 'relative',
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: { paddingTop: theme.spacing(15) },
}));

const StyledContainer = styled((props: MotionProps & Omit<BoxProps, 'style'>) => (
  <Box component={m.div} {...props} />
))(({ theme }) => ({
  top: 0,
  height: '110vh',
  display: 'flex',
  position: 'sticky',
  overflow: 'hidden',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  transition: theme.transitions.create(['background-color']),
  '&[data-scrolling="true"]': { justifyContent: 'center' },
}));

const StyledContent = styled(
  forwardRef((props: BoxProps & MotionProps, ref) => (
    <Box ref={ref} component={m.div} transition={{ ease: 'linear', duration: 0.25 }} {...props} />
  ))
)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: { gap: theme.spacing(5) },
}));

const StyledItem = styled((props: BoxProps & MotionProps) => <Box component={m.div} {...props} />)({
  backgroundSize: 'auto 100%',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'center center',
});

// ----------------------------------------------------------------------

function ScrollContent() {
  const theme = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const containerRect = useClientRect(containerRef);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRect = useClientRect(scrollRef);

  const [startScroll, setStartScroll] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const physics = { damping: 16, mass: 0.16, stiffness: 50 };

  const scrollRange = -scrollRect.scrollWidth + containerRect.width;

  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, scrollRange]), physics);
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], [scrollRange, 0]), physics);

  const background: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      theme.vars.palette.background.default,
      theme.vars.palette.background.neutral,
      theme.vars.palette.background.neutral,
      theme.vars.palette.background.neutral,
      theme.vars.palette.background.default,
    ]
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest !== 0 && latest !== 1) {
      setStartScroll(true);
    } else {
      setStartScroll(false);
    }
  });

  return (
    <StyledRoot ref={containerRef} sx={{ height: scrollRect.scrollWidth, minHeight: '110vh' }}>
      <StyledContainer style={{ background }} data-scrolling={startScroll}>
        <StyledContent ref={scrollRef} layout>
          <StyledItem
            style={{ x: x1 }}
            sx={{
              height: { xs: 160, md: 180 },
              width: { xs: '300%', md: '200%' },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>{Testimonials}</Box>
          </StyledItem>
          <StyledItem
            style={{ x: x2 }}
            sx={{
              height: { xs: 400, md: 480 },
              width: { xs: '300%', md: '200%' },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>Salut</Box>
              <Box sx={{ flexGrow: 1 }}>Salut</Box>
              <Box sx={{ flexGrow: 1 }}>Salut</Box>
            </Box>
          </StyledItem>
        </StyledContent>
      </StyledContainer>
    </StyledRoot>
  );
}
