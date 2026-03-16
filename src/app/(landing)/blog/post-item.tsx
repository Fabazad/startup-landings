'use client';

import { DEFAULT_AUTHOR, type BlogPost, type IPostItem } from 'src/types/blog';
import { usePostHog } from 'posthog-js/react';
import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { maxLine, varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type PostItemProps = CardProps & {
  post: BlogPost;
};

export function PostItem({ post, sx, ...other }: PostItemProps) {
  const posthog = usePostHog();
  const linkTo = paths.post.details(post.slug);

  const handleClick = () => {
    posthog.capture('blog_post_clicked', {
      title: post.title,
      slug: post.slug,
      source: 'blog_list',
    });
  };

  return (
    <Link
      underline="none"
      component={RouterLink}
      href={linkTo}
      color="inherit"
      onClick={handleClick}
    >
      <Card
        sx={{
          ...sx,
          '&:hover': {
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
            transition: 'all 0.1s ease-in-out',
          },
        }}
        {...other}
      >
        <Box sx={{ position: 'relative' }}>
          <AvatarShape
            sx={{
              left: 0,
              zIndex: 9,
              width: 88,
              height: 36,
              bottom: -16,
              position: 'absolute',
              '&:hover': {
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          />

          <Avatar
            alt={post.author}
            src={DEFAULT_AUTHOR.avatarUrl}
            sx={{
              left: 24,
              zIndex: 9,
              bottom: -24,
              position: 'absolute',
            }}
          />

          <Image alt={post.title} src={post.cover_image} ratio="4/3" />
        </Box>

        <CardContent sx={{ pt: 6 }}>
          <Typography variant="caption" component="div" sx={{ mb: 1, color: 'text.disabled' }}>
            {fDate(post.created_at)}
          </Typography>

          <Typography
            color="inherit"
            variant="subtitle2"
            sx={(theme) => ({
              ...maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
            })}
          >
            {post.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

// ----------------------------------------------------------------------

type PostItemLatestProps = {
  post: BlogPost;
  index: number;
};

export function PostItemLatest({ post, index }: PostItemLatestProps) {
  const posthog = usePostHog();
  const linkTo = paths.post.details(post.slug);

  const handleClick = () => {
    posthog.capture('blog_post_clicked', {
      title: post.title,
      slug: post.slug,
      source: 'latest_posts',
    });
  };

  const postSmall = index === 1 || index === 2;

  return (
    <Link
      underline="none"
      component={RouterLink}
      href={linkTo}
      color="inherit"
      onClick={handleClick}
    >
      <Card>
        <Avatar
          alt={post.author}
          src={DEFAULT_AUTHOR.avatarUrl}
          sx={{
            top: 24,
            left: 24,
            zIndex: 9,
            position: 'absolute',
          }}
        />

        <Image
          alt={post.title}
          src={post.cover_image}
          ratio="4/3"
          sx={{ height: 360 }}
          slotProps={{
            overlay: { bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.64) },
          }}
        />

        <CardContent
          sx={{
            width: 1,
            zIndex: 9,
            bottom: 0,
            position: 'absolute',
            color: 'common.white',
          }}
        >
          <Typography variant="caption" component="div" sx={{ mb: 1, opacity: 0.64 }}>
            {fDate(post.created_at)}
          </Typography>

          <Typography
            variant={postSmall ? 'subtitle2' : 'h5'}
            sx={(theme) => ({
              ...maxLine({
                line: 2,
                persistent: postSmall ? theme.typography.subtitle2 : theme.typography.h5,
              }),
            })}
          >
            {post.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

// ----------------------------------------------------------------------

type InfoBlockProps = BoxProps & Pick<IPostItem, 'totalViews' | 'totalShares' | 'totalComments'>;

export function InfoBlock({
  sx,
  totalComments,
  totalViews,
  totalShares,
  ...other
}: InfoBlockProps) {
  return (
    <Box
      gap={1.5}
      display="flex"
      justifyContent="flex-end"
      sx={{
        mt: 3,
        typography: 'caption',
        color: 'text.disabled',
        ...sx,
      }}
      {...other}
    >
      <Box gap={0.5} display="flex" alignItems="center">
        <Iconify width={16} icon="eva:message-circle-fill" />
        {fShortenNumber(totalComments)}
      </Box>

      <Box gap={0.5} display="flex" alignItems="center">
        <Iconify width={16} icon="solar:eye-bold" />
        {fShortenNumber(totalViews)}
      </Box>

      <Box gap={0.5} display="flex" alignItems="center">
        <Iconify width={16} icon="solar:share-bold" />
        {fShortenNumber(totalShares)}
      </Box>
    </Box>
  );
}
