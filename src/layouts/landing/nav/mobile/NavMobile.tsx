import { Drawer, Link } from '@mui/material';
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
import { useTranslate } from 'src/locales';

export const NavMobile = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);

  const { t } = useTranslate();
  const { features, plans } = useProductIdea();

  const onClose = () => {
    setOpenDrawer(false);
  };

  const openDrawerHandler = () => {
    setOpenFeatures(false);
    setOpenDrawer(true);
  };

  return (
    <>
      <MenuButton
        onClick={openDrawerHandler}
        sx={{
          mr: 1,
          ml: -1,
          display: { xs: 'block', md: 'none' },
        }}
      />

      <Drawer open={openDrawer} onClose={onClose}>
        <List
          sx={{ minWidth: '300px', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <MenuButton
                onClick={() => setOpenDrawer(false)}
                sx={{
                  mt: 1,
                  ml: -1,
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </ListSubheader>
          }
        >
          <ListItemButton component={Link} href="#home" onClick={onClose}>
            <ListItemIcon>
              <Iconify icon="mdi:home" />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.home')} />
          </ListItemButton>
          <ListItemButton onClick={() => setOpenFeatures(!openFeatures)}>
            <ListItemIcon>
              <Iconify icon="mdi:star-outline" />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.features')} />
            {openFeatures ? (
              <Iconify icon="mdi:chevron-down" />
            ) : (
              <Iconify icon="mdi:chevron-right" />
            )}
          </ListItemButton>
          <Collapse in={openFeatures} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {features.map((feature) => (
                <ListItemButton
                  key={feature.id}
                  sx={{ pl: 4 }}
                  component={Link}
                  href={`#feature-${feature.id}`}
                  onClick={onClose}
                >
                  <ListItemText primary={feature.title} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          {plans && <ListItemButton component={Link} href="#pricing" onClick={onClose}>
            <ListItemIcon>
              <Iconify icon="mdi:cash-multiple" />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.pricing')} />
          </ListItemButton>}
          <ListItemButton component={Link} href="#testimonials" onClick={onClose}>
            <ListItemIcon>
              <Iconify icon="mdi:people" />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.testimonials')} />
          </ListItemButton>
          <ListItemButton component={Link} href="#contact" onClick={onClose}>
            <ListItemIcon>
              <Iconify icon="mdi:email" />
            </ListItemIcon>
            <ListItemText primary={t('landing.nav.contact')} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};
