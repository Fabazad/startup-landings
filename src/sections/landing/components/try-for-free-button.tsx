import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Iconify } from 'src/components/iconify';
import { useSubscription } from './SubscriptionModal/subscriptionModal';

export const TryForFreeButton = () => {
  const { t } = useTranslation();

  const { setOpenModal, subscriptionEmail } = useSubscription();

  const handleClick = () => {
    if (subscriptionEmail) {
      setOpenModal(true);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <Button
      color="inherit"
      size="large"
      variant="contained"
      startIcon={<Iconify width={24} icon="ph:rocket-launch-duotone" />}
      onClick={handleClick}
    >
      <span>
        {subscriptionEmail
          ? t('landing.hero.buttons.open-waiting-list')
          : t('landing.hero.buttons.try-for-free')}
      </span>
    </Button>
  );
};
