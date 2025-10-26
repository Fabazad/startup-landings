import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { useSubscriptionModal } from './SubscriptionModal/subscriptionModal';

export const TryForFreeButton = () => {
  const { t } = useTranslation();

  const { setOpen } = useSubscriptionModal();
  return (
    <Button
      color="inherit"
      size="large"
      variant="contained"
      startIcon={<Iconify width={24} icon="ph:rocket-launch-duotone" />}
      onClick={() => setOpen(true)}
    >
      <span>{t('landing.hero.buttons.try-for-free')}</span>
    </Button>
  );
};
