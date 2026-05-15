'use client';

import { Avatar, AvatarGroup, Box, avatarClasses } from '@mui/material';
import { CONFIG } from 'src/config-global';
import { AnimatedDiv } from './animated-div';

// Hardcoded asset references avoid pulling the `src/_mock` barrel — and the
// large `assets.ts` data set behind it — into the hero (initial) bundle.
// The hero needs three decorative avatars and matching alt text; everything
// else `_mock` exposes is irrelevant here.
const HERO_AVATARS: Array<{ name: string; src: string }> = [
  { name: 'Lucian Obrien', src: `${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-2.webp` },
  { name: 'Deja Brady', src: `${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-3.webp` },
  { name: 'Harrison Stein', src: `${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-4.webp` },
];

export function Ratings({ ratingsText = '' }: { ratingsText?: string }) {
  return (
    <AnimatedDiv>
      <Box
        gap={1.5}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        sx={{ typography: 'subtitle2' }}
      >
        <AvatarGroup sx={{ [`& .${avatarClasses.root}`]: { width: 32, height: 32 } }}>
          {HERO_AVATARS.map(({ name, src }) => (
            <Avatar key={name} alt={name} src={src} />
          ))}
        </AvatarGroup>
        {ratingsText}
      </Box>
    </AnimatedDiv>
  );
}
