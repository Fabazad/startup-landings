import { Avatar, Box, Rating, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { _mock } from 'src/_mock';
import { varFade } from 'src/components/animate';
import {
  Carousel,
  CarouselArrowBasicButtons,
  carouselBreakpoints,
  CarouselDotButtons,
  useCarousel,
} from 'src/components/carousel';
import { maxLine } from 'src/theme/styles';
import { Review } from 'src/types/ProductIdea';
import { fToNow } from 'src/utils/format-time';
import { TryForFreeButton } from '../components/try-for-free-button';
import { HorizontalDivider } from './horizontal-divider';

export const Reviews = ({ reviews }: { reviews: Review[] }) => {
  const { t } = useTranslation();

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });

  return (
    <Stack sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
      <HorizontalDivider position="top" />

      <Carousel carousel={carousel}>
        {reviews.map((item, index) => (
          <Stack key={item.id} component={m.div} variants={varFade().in}>
            <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
              <Rating
                size="small"
                name="read-only"
                value={item.rating}
                precision={0.5}
                readOnly
                getLabelText={(value) => `${value} ${t('rating.stars')}`}
              />
              {item.jobTitle}
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
              <Avatar
                alt={item.name}
                src={_mock.image.avatar(index)}
                sx={{ width: 48, height: 48 }}
              />
              <Stack sx={{ typography: 'subtitle1' }}>
                <Box component="span">{item.name}</Box>
                <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
                  {fToNow(dayjs(item.postedAt).toDate())}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Carousel>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: { xs: 5, md: 8 } }}
      >
        <CarouselDotButtons
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />

        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
      </Stack>
      <Box
        variants={varFade({ distance: 24 }).inUp}
        component={m.div}
        sx={{ textAlign: 'center', mt: 5 }}
      >
        <TryForFreeButton buttonName="try-for-free-testimonials" />
      </Box>
    </Stack>
  );
};
