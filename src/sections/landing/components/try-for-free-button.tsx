import { Button } from '@mui/material';
import { sendGAEvent } from '@next/third-parties/google';
import { useTranslation } from 'react-i18next';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Iconify } from 'src/components/iconify';
import { useSubscription } from './SubscriptionModal/subscriptionModal';

export const TryForFreeButton = ({ buttonName }: { buttonName: string }) => {
  const { t } = useTranslation();
  const { name: productName } = useProductIdea();
  const { setOpenModal, subscriptionEmail } = useSubscription();

  const handleClick = () => {
    if (subscriptionEmail) {
      setOpenModal(true);
    } else {
      setOpenModal(true);
      sendGAEvent('try_for_free_button_click', {
        event_button: buttonName,
        event_product: productName,
      });
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
