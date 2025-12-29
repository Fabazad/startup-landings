"use client";

import { Button, ButtonProps } from '@mui/material';
import { t } from 'i18next';
import posthog from 'posthog-js';
import { useProductIdea } from 'src/app/product-idea-provider';
import {
  SubscriptionStep,
  useSubscription,
} from 'src/sections/landing/components/SubscriptionModal/subscription-context';

export const GetStartedButton = ({
  buttonName,
  ...other
}: ButtonProps & {
  outlined?: boolean;
  buttonName: string;
}) => {
  const { setOpenModal, subscriptionStep } = useSubscription();
  const { name: productName, isReady, ctaName } = useProductIdea();

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

  return (
    <Button
      variant={other.variant || 'contained'}
      {...other}
      rel="noopener"
      onClick={!isReady ? handleClick : undefined}
      href={isReady ? "/auth/sign-up" : undefined}
      sx={{
        display: 'inline-flex',
        borderRadius: 999,
        px: 3
      }}
    >
      {subscriptionStep === SubscriptionStep.SUCCESS
        ? t('landing.hero.buttons.open-waiting-list')
        : ctaName || t('landing.hero.buttons.get-started')}
    </Button>
  );
};
