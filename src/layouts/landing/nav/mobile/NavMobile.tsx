"use client";

import { Box, Drawer, Link, ListItem, IconButton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useState } from 'react';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Iconify } from 'src/components/iconify';
import { MenuButton } from 'src/layouts/components/menu-button';
import { ThemeButton } from 'src/layouts/components/theme-button';
import { useTranslate } from 'src/locales';
import { LanguageButton } from 'src/sections/landing/components/language-button';
import { SignInButton } from 'src/sections/landing/components/sign-in-button';

export const NavMobile = ({ showConnection = true }: { showConnection?: boolean }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);

  const { t } = useTranslate();
  const { features, plans, isReady, faq } = useProductIdea();

  const onClose = () => {
    setOpenDrawer(false);
  };

  const openDrawerHandler = () => {
    setOpenFeatures(false);
    setOpenDrawer(true);
  };

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

      <Drawer 
        open={openDrawer} 
        onClose={onClose} 
        anchor="right"
        PaperProps={{
          sx: { width: '100vw', maxWidth: 'none' }
        }}
      >
        <List
          sx={{ width: '100%', bgcolor: 'background.paper', px: { xs: 2, sm: 4 }, py: 2 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{ display: 'flex', alignItems: 'center', height: 60, mb: 2, bgcolor: 'background.paper', px: 0 }}>
              <ThemeButton />
              <LanguageButton />

              <IconButton
                onClick={onClose}
                sx={{ ml: 'auto' }}
              >
                <Iconify icon="mdi:close" width={28} />
              </IconButton>
            </ListSubheader>
          }
        >
          <ListItemButton component={Link} href="#home" onClick={onClose} sx={{ py: 1.5, mb: 1, borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Iconify icon="mdi:home" width={24} />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.home')} primaryTypographyProps={{ typography: 'subtitle1', fontWeight: 600 }} />
          </ListItemButton>
          
          <ListItemButton onClick={() => setOpenFeatures(!openFeatures)} sx={{ py: 1.5, mb: 1, borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Iconify icon="mdi:star-outline" width={24} />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.features')} primaryTypographyProps={{ typography: 'subtitle1', fontWeight: 600 }} />
            {openFeatures ? (
              <Iconify icon="mdi:chevron-down" width={24} />
            ) : (
              <Iconify icon="mdi:chevron-right" width={24} />
            )}
          </ListItemButton>
          
          <Collapse in={openFeatures} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2, mb: 1 }}>
              {features.map((feature) => (
                <ListItemButton
                  key={feature.id}
                  sx={{ py: 1.5, mb: 0.5, borderRadius: 1 }}
                  component={Link}
                  href={`/#feature-${feature.id}`}
                  onClick={onClose}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Iconify icon="solar:round-alt-arrow-right-bold" width={16} sx={{ color: 'text.secondary', opacity: 0.5 }} />
                  </ListItemIcon>
                  <ListItemText primary={feature.title} primaryTypographyProps={{ typography: 'body1', fontWeight: 500 }} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          
          {plans && (
            <ListItemButton component={Link} href="/#pricing" onClick={onClose} sx={{ py: 1.5, mb: 1, borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Iconify icon="mdi:cash-multiple" width={24} />
              </ListItemIcon>
              <ListItemText primary={t('landing.nav.pricing')} primaryTypographyProps={{ typography: 'subtitle1', fontWeight: 600 }} />
            </ListItemButton>
          )}
          
          <ListItemButton component={Link} href="/#testimonials" onClick={onClose} sx={{ py: 1.5, mb: 1, borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Iconify icon="mdi:people" width={24} />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.testimonials')} primaryTypographyProps={{ typography: 'subtitle1', fontWeight: 600 }} />
          </ListItemButton>
          
          <ListItemButton component={Link} href="/#contact" onClick={onClose} sx={{ py: 1.5, mb: 1, borderRadius: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Iconify icon="mdi:email" width={24} />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.contact')} primaryTypographyProps={{ typography: 'subtitle1', fontWeight: 600 }} />
          </ListItemButton>
          
          {faq && (
            <ListItemButton component={Link} href="/#faq" onClick={onClose} sx={{ py: 1.5, mb: 2, borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Iconify icon="mdi:help-circle" width={24} />
              </ListItemIcon>
              <ListItemText primary={t('landing.nav.faq')} primaryTypographyProps={{ typography: 'subtitle1', fontWeight: 600 }} />
            </ListItemButton>
          )}
          
          {isReady && showConnection && (
            <ListItem sx={{ pt: 2, px: 0, justifyContent: 'center' }}>
              <SignInButton />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};
