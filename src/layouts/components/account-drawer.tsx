'use client';

import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { varAlpha } from 'src/theme/styles';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateAvatar } from 'src/components/animate';
import { useAuthContext } from 'src/auth/hooks';
import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';
import Link from 'next/link';
import { paths } from 'src/routes/paths';


export function AccountDrawer() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);


  const { user } = useAuthContext();

  if (!user) return null;


  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user.avatarUrl, alt: user.displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user.displayName?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        onClick={handleOpenDrawer}
        photoURL={user.avatarUrl}
        displayName={user.displayName}
      />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {user.displayName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
              {user?.email}
            </Typography>
          </Stack>

          <Stack
            sx={{
              mt: 3,
              py: 3,
              px: 2.5,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >

            <MenuItem
              component={Link}
              href={paths.envy.account.profile}
              sx={{
                py: 1,
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
              onClick={handleCloseDrawer}
            >
              <Iconify icon="iconamoon:profile-circle-fill" sx={{ width: 24, height: 24 }} />
              <Box component="span" sx={{ ml: 2 }}>
                Modifier mon profil
              </Box>
            </MenuItem>


            <MenuItem
              component={Link}
              href={paths.envy.account.credentials}
              sx={{
                py: 1,
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
              onClick={handleCloseDrawer}
            >
              <Iconify icon="iconamoon:lock-fill" sx={{ width: 24, height: 24 }} />
              <Box component="span" sx={{ ml: 2 }}>
                Identifiants
              </Box>
            </MenuItem>


          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </>
  );
}
