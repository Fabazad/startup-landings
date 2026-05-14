/* eslint-disable no-console */

'use client';

import Image from 'next/image';

import { type IPostHero } from 'src/types/blog';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SpeedDial from '@mui/material/SpeedDial';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';

import { useTranslation } from 'react-i18next';

import { Iconify } from 'src/components/iconify';
import { Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

export function PostDetailsHero({ title, author, coverUrl, createdAt }: IPostHero) {
  const { t } = useTranslation();

  const theme = useTheme();

  const handleClick = async () => {
    const shareLink = `${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          url: shareLink,
          title,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareLink);
      } catch (error) {
        console.error('Error copying link:', error);
      }
    }
  };

  const overlayColor = varAlpha(theme.vars.palette.grey['900Channel'], 0.64);

  return (
    <Box sx={{ position: 'relative', height: 480, overflow: 'hidden' }}>
      <Image
        src={coverUrl}
        alt={title}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(0deg, ${overlayColor}, ${overlayColor})`,
        }}
      />

      <Container sx={{ height: 1, position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            zIndex: 9,
            color: 'common.white',
            position: 'absolute',
            maxWidth: 480,
            pt: { xs: 2, md: 8 },
          }}
        >
          {title}
        </Typography>

        <Stack
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            position: 'absolute',
          }}
        >
          {author && createdAt && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{ px: { xs: 2, md: 3 }, pb: { xs: 3, md: 8 } }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 64,
                  height: 64,
                  mr: 2,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  width={64}
                  height={64}
                  sizes="64px"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </Box>

              <ListItemText
                sx={{ color: 'common.white' }}
                primary={author.name}
                secondary={fDate(createdAt)}
                primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
                secondaryTypographyProps={{ color: 'inherit', sx: { opacity: 0.64 } }}
              />
            </Stack>
          )}

          <Tooltip title={t('blog.sharePost')} placement="top" arrow>
            <SpeedDial
              ariaLabel={t('blog.sharePost')}
              icon={<Iconify icon="solar:share-bold" />}
              FabProps={{ size: 'medium' }}
              sx={{
                position: 'absolute',
                bottom: { xs: 32, md: 64 },
                right: { xs: 16, md: 24 },
              }}
              onClick={handleClick}
            />
          </Tooltip>
        </Stack>
      </Container>
    </Box>
  );
}
