import { Dialog } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'src/hooks/use-cookies';
import { useSearchParams } from 'src/routes/hooks';
import { SubscriptionForm } from './subscriptionForm';
import { SubscriptionSuccess } from './subscriptionSuccess';

const SUBSCRIBE_MODAL_PARAM = 'subscribeModal';
const SUBSCRIBE_EMAIL_COOKIE = 'subscribeEmail';

type SubscriptionModalContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  subscriptionEmail: string | null;
  setSubscriptionEmail: (subscriptionEmail: string) => void;
} | null;

const subscriptionModalContext = createContext<SubscriptionModalContext>(null);

export const useSubscriptionModal = () => {
  const context = useContext(subscriptionModalContext);
  if (!context) {
    throw new Error('useSubscriptionModal must be used within a SubscriptionModalProvider');
  }
  return context;
};

const SubscribeStep = {
  SUBSCRIBE: 'subscribe',
  SUCCESS: 'success',
} as const;
type SubscribeStep = (typeof SubscribeStep)[keyof typeof SubscribeStep];

const SubscriptionModal = () => {
  const { open, setOpen, subscriptionEmail } = useSubscriptionModal();
  const [step, setStep] = useState<SubscribeStep>(
    subscriptionEmail ? SubscribeStep.SUCCESS : SubscribeStep.SUBSCRIBE
  );

  useEffect(() => {
    setStep(subscriptionEmail ? SubscribeStep.SUCCESS : SubscribeStep.SUBSCRIBE);
  }, [subscriptionEmail]);

  return (
    <Dialog open={open}>
      {step === SubscribeStep.SUBSCRIBE && <SubscriptionForm setOpen={setOpen} />}
      {step === SubscribeStep.SUCCESS && <SubscriptionSuccess />}
    </Dialog>
  );
};

export const SubscriptionModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const subscribeParam = searchParams.get(SUBSCRIBE_MODAL_PARAM);
    setOpen(subscribeParam === 'true');
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

  const handleSetOpen = (isOpen: boolean) => {
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
    <subscriptionModalContext.Provider
      value={{
        open,
        setOpen: handleSetOpen,
        subscriptionEmail,
        setSubscriptionEmail: updateSubscribeEmail,
      }}
    >
      <SubscriptionModal />
      {children}
    </subscriptionModalContext.Provider>
  );
};
