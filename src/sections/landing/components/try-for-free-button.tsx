import { Button } from '@mui/material';
import posthog from 'posthog-js';
import { useTranslation } from 'react-i18next';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Iconify } from 'src/components/iconify';
import { SubscriptionStep, useSubscription } from './SubscriptionModal/subscriptionModal';

export const TryForFreeButton = ({ buttonName }: { buttonName: string }) => {
  const { t } = useTranslation();
  const { name: productName } = useProductIdea();
  const { setOpenModal, subscriptionStep } = useSubscription();

  const handleClick = () => {
    setOpenModal(true);
    if (subscriptionStep === SubscriptionStep.SUBSCRIBE_EMAIL) {
      setOpenModal(true);
      posthog.capture('try_for_free_button_click', {
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
      sx={{
        borderRadius: '9999px',
      }}
    >
      <span>
        {subscriptionStep === SubscriptionStep.SUCCESS
          ? t('landing.hero.buttons.open-waiting-list')
          : t('landing.hero.buttons.try-for-free')}
      </span>
    </Button>
  );
};
