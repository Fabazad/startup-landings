import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { Iconify } from '../iconify';

export const TryForFreeButton = () => {
  const { t } = useTranslation();
  return (
    <Button
      component={RouterLink}
      href={paths.dashboard.root}
      color="inherit"
      size="large"
      variant="contained"
      startIcon={<Iconify width={24} icon="ph:rocket-launch-duotone" />}
    >
      <span>{t('landing.hero.buttons.try-for-free')}</span>
    </Button>
  );
};
