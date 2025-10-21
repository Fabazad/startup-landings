import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { FlagIcon } from 'src/components/iconify';
import { LanguageValue, useTranslate } from 'src/locales';

export const LanguageButton = () => {
  const { currentLang, onChangeLang, t } = useTranslate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FlagIcon code={currentLang.countryCode} />{' '}
        <span style={{ marginLeft: 8 }}>{languages[currentLang.value as LanguageValue].label}</span>
      </Button>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {Object.values(languages).map((language) => (
          <MenuItem key={language.value} onClick={handleClose(language.value)}>
            <FlagIcon code={language.countryCode} />
            <span style={{ marginLeft: 8 }}>{language.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
