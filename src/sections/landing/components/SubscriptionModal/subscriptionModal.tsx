import { Dialog } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'src/hooks/use-cookies';
import { useSearchParams } from 'src/routes/hooks';
import { SubscriptionForm } from './subscriptionForm';
import { SubscriptionSuccess } from './subscriptionSuccess';

const SUBSCRIBE_MODAL_PARAM = 'subscribeModal';
const SUBSCRIBE_EMAIL_COOKIE = 'subscribeEmail';

type SubscriptionContext = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  subscriptionEmail: string | null;
  setSubscriptionEmail: (subscriptionEmail: string) => void;
} | null;

const subscriptionContext = createContext<SubscriptionContext>(null);

export const useSubscription = () => {
  const context = useContext(subscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

const SubscribeStep = {
  SUBSCRIBE: 'subscribe',
  SUCCESS: 'success',
} as const;
type SubscribeStep = (typeof SubscribeStep)[keyof typeof SubscribeStep];

const SubscriptionModal = () => {
  const { openModal, subscriptionEmail } = useSubscription();
  const [step, setStep] = useState<SubscribeStep>(
    subscriptionEmail ? SubscribeStep.SUCCESS : SubscribeStep.SUBSCRIBE
  );

  useEffect(() => {
    setStep(subscriptionEmail ? SubscribeStep.SUCCESS : SubscribeStep.SUBSCRIBE);
  }, [subscriptionEmail]);

  return (
    <Dialog open={openModal} fullWidth maxWidth="xs">
      {step === SubscribeStep.SUBSCRIBE && <SubscriptionForm />}
      {step === SubscribeStep.SUCCESS && <SubscriptionSuccess />}
    </Dialog>
  );
};

export const SubscriptionModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const subscribeParam = searchParams.get(SUBSCRIBE_MODAL_PARAM);
    setOpenModal(subscribeParam === 'true');
  }, [searchParams]);

  const { state: subscriptionEmailCookie, setState: setSubscriptionEmailCookie } = useCookies<
    string | null
  >(SUBSCRIBE_EMAIL_COOKIE, null, null);

  const [subscriptionEmail, setSubscriptionEmail] = useState<string | null>(
    subscriptionEmailCookie
  );

  useEffect(() => {
    setSubscriptionEmail(subscriptionEmailCookie);
  }, [subscriptionEmailCookie]);

  const updateSubscribeEmail = (subscribeEmail: string) => {
    setSubscriptionEmailCookie(subscribeEmail);
    setSubscriptionEmail(subscribeEmail);
  };

  const handleSetOpenModal = (isOpen: boolean) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (isOpen) {
      url.searchParams.set(SUBSCRIBE_MODAL_PARAM, 'true');
    } else {
      url.searchParams.delete(SUBSCRIBE_MODAL_PARAM);
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <subscriptionContext.Provider
      value={{
        openModal,
        setOpenModal: handleSetOpenModal,
        subscriptionEmail,
        setSubscriptionEmail: updateSubscribeEmail,
      }}
    >
      <SubscriptionModal />
      {children}
    </subscriptionContext.Provider>
  );
};
