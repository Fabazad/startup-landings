'use client';

import { Button, SxProps, Theme } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';
import { FlagIcon } from 'src/components/iconify';
import { LanguageValue, useTranslate } from 'src/locales';

// MUI's Menu drags Popover, Modal, focus-trap, click-away listener, etc.
// None of that is needed until the user actually opens the language picker,
// so defer the chunk until the first click.
const Menu = dynamic(() => import('@mui/material/Menu').then((m) => m.default), { ssr: false });
const MenuItem = dynamic(() => import('@mui/material/MenuItem').then((m) => m.default), {
  ssr: false,
});

export function LanguageButton({ sx = {} }: { sx?: SxProps<Theme> }) {
  const { currentLang, onChangeLang, t } = useTranslate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [hasOpenedOnce, setHasOpenedOnce] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHasOpenedOnce(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang: LanguageValue) => () => {
    onChangeLang(lang);
    setAnchorEl(null);
  };

  const languages: Record<
    LanguageValue,
    { label: string; countryCode: string; value: LanguageValue }
  > = {
    fr: {
      label: t('langs.french'),
      countryCode: 'FR',
      value: 'fr',
    },
    en: {
      label: t('langs.english'),
      countryCode: 'US',
      value: 'en',
    },
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={sx}
      >
        <FlagIcon code={currentLang.countryCode} />
      </Button>
      {hasOpenedOnce && (
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {Object.values(languages).map((language) => (
            <MenuItem key={language.value} onClick={handleClose(language.value)}>
              <FlagIcon code={language.countryCode} />
              <span style={{ marginLeft: 8 }}>{language.label}</span>
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
}
