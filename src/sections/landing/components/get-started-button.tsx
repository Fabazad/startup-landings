import { Button, ButtonProps, useTheme } from '@mui/material';
import { t } from 'i18next';
import posthog from 'posthog-js';
import { useProductIdea } from 'src/app/product-idea-provider';
import { paths } from 'src/routes/paths';
import {
  SubscriptionStep,
  useSubscription,
} from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';
import Link from 'next/link';

export const GetStartedButton = ({
  buttonName,
  ...other
}: ButtonProps & {
  outlined?: boolean;
  buttonName: string;
}) => {
  const { setOpenModal, subscriptionStep } = useSubscription();
  const theme = useTheme();
  const { name: productName, isReady } = useProductIdea();

  const handleClick = () => {
    setOpenModal(true);
    if (subscriptionStep === SubscriptionStep.SUBSCRIBE_EMAIL) {
      setOpenModal(true);
      posthog.capture('get_started_button_click', {
        event_button: buttonName,
        event_product: productName,
      });
    }
  };
  // rounded button

  if (isReady) return (<Link href={paths.auth.signIn}>
    <Button
      variant={other.variant || 'contained'}
      {...other}
      sx={{
        display: 'inline-flex',
        borderRadius: '9999px',
      }}
    >
      {t('landing.hero.buttons.get-started')}
    </Button>
  </Link>)
  return (
    <Button
      variant={other.variant || 'contained'}
      {...other}
      rel="noopener"
      onClick={handleClick}
      sx={{
        display: 'inline-flex',
        borderRadius: '9999px',
      }}
    >
      {subscriptionStep === SubscriptionStep.SUCCESS
        ? t('landing.hero.buttons.open-waiting-list')
        : t('landing.hero.buttons.get-started')}
    </Button>
  );
};
