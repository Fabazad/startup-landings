'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { useProductIdea } from 'src/app/product-idea-provider';
import { MenuButton } from 'src/layouts/components/menu-button';
import { SignInButton } from 'src/sections/landing/components/sign-in-button';
import { ExtraLink } from 'src/types/ProductIdea';

// The drawer body is large (Drawer + List + ~15 ListItemButton + Collapse +
// many Iconify renders). It's not visible until the user taps the menu, so
// defer loading the chunk until first open. We keep the component mounted
// after that so the close transition still plays.
const NavMobileDrawer = dynamic(() => import('./nav-mobile-drawer'), { ssr: false });

export function NavMobile({
  showConnection = true,
  hasBlog = false,
  extraLinks = [],
}: {
  showConnection?: boolean;
  hasBlog?: boolean;
  extraLinks?: Array<ExtraLink>;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const { isReady } = useProductIdea();

  const onClose = useCallback(() => setOpenDrawer(false), []);

  const openDrawerHandler = useCallback(() => {
    setHasOpenedOnce(true);
    setOpenDrawer(true);
  }, []);

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {isReady && showConnection && <SignInButton />}
        <MenuButton
          onClick={openDrawerHandler}
          sx={{
            mr: 1,
            ml: 2,
          }}
        />
      </Box>

      {hasOpenedOnce && (
        <NavMobileDrawer
          open={openDrawer}
          onClose={onClose}
          showConnection={showConnection}
          hasBlog={hasBlog}
          extraLinks={extraLinks}
        />
      )}
    </>
  );
}
