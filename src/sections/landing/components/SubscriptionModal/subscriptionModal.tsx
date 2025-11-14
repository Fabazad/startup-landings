'use client';

import { Box, CircularProgress, Dialog } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useProductIdea } from 'src/app/product-idea-provider';
import { useCookies } from 'src/hooks/use-cookies';
import { LanguageValue, useTranslate } from 'src/locales';
import { useSearchParams } from 'src/routes/hooks';
import { SubscriptionEmailForm } from './subscriptionEmailForm';
import { SubscriptionFeaturesForm } from './SubscriptionFeaturesForm/subscriptionFeaturesForm';
import { SubscriptionSuccess } from './subscriptionSuccess';

const SUBSCRIBE_MODAL_PARAM = 'subscribeModal';
const SUBSCRIPTION_ID_COOKIE = 'subscriptionId';

export const SubscriptionStep = {
  SUBSCRIBE_EMAIL: 'subscribe-email',
  SUBSCRIBE_FEATURES: 'subscribe-features',
  SUCCESS: 'success',
} as const;
export type SubscriptionStep = (typeof SubscriptionStep)[keyof typeof SubscriptionStep];

type SubscriptionContext = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  subscriptionStep: SubscriptionStep;
  createSubscription: (
    subscriptionEmail: string
  ) => Promise<{ error: 'already-subscribed' | 'failed-to-subscribe' } | null>;
  updateSubscriptionFeatures: (
    subscriptionFeatures: string[]
  ) => Promise<{ error: 'no-subscription-email' | 'failed-to-add-features' } | null>;
  isLoading: boolean;
  isFirstFetching: boolean;
} | null;

const subscriptionContext = createContext<SubscriptionContext>(null);

export const useSubscription = () => {
  const context = useContext(subscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

const api = {
  createSubscription: async (
    email: string,
    productName: string,
    language: LanguageValue
  ): Promise<
    { error: 'already-subscribed' | 'failed-to-subscribe' } | { subscriptionId: number }
  > => {
    const response = await axios.post(
      '/api/subscriptions',
      {
        email: email,
        product: productName,
        language,
      },
      { validateStatus: () => true }
    );

    if (response.status !== 201) {
      if (response.data.error === 'already-subscribed') {
        return { error: 'already-subscribed' };
      }
      return { error: 'failed-to-subscribe' };
    }

    return { subscriptionId: response.data.subscriptionId };
  },
  updateSubscriptionFeatures: async (params: {
    subscriptionId: number;
    features: string[];
  }): Promise<{ error: 'failed-to-add-features' } | null> => {
    const { subscriptionId, features } = params;
    const response = await axios.put<{ features: string[] }>('/api/subscriptions', {
      subscriptionId,
      features,
    });

    if (response.status !== 200) {
      return { error: 'failed-to-add-features' };
    }
    return null;
  },
  getHasSubscriptionFeatures: async (subscriptionId: number): Promise<boolean> => {
    const response = await axios.get<{ hasFeatures: boolean }>('/api/subscriptions', {
      params: { subscriptionId },
    });
    return response.data.hasFeatures;
  },
};

const SubscriptionModal = () => {
  const { openModal, subscriptionStep, isFirstFetching } = useSubscription();

  return (
    <Dialog open={openModal} fullWidth maxWidth="md">
      {isFirstFetching && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isFirstFetching && (
        <>
          {subscriptionStep === SubscriptionStep.SUBSCRIBE_EMAIL && <SubscriptionEmailForm />}
          {subscriptionStep === SubscriptionStep.SUBSCRIBE_FEATURES && <SubscriptionFeaturesForm />}
          {subscriptionStep === SubscriptionStep.SUCCESS && <SubscriptionSuccess />}
        </>
      )}
    </Dialog>
  );
};

export const SubscriptionModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstFetching, setIsFirstFetching] = useState(true);
  const searchParams = useSearchParams();
  const { name: productName } = useProductIdea();

  const { state: subscriptionIdCookie, setState: setSubscriptionIdCookie } = useCookies<
    number | null
  >(SUBSCRIPTION_ID_COOKIE, null, null);

  const [subscriptionId, setSubscriptionId] = useState<number | null>(subscriptionIdCookie);

  const [step, setStep] = useState<SubscriptionStep>(
    subscriptionId ? SubscriptionStep.SUCCESS : SubscriptionStep.SUBSCRIBE_EMAIL
  );

  const { currentLang } = useTranslate();

  const {
    data: hasSubscriptionFeatures,
    refetch: refetchSubscriptionFeatures,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ['hasSubscriptionFeatures', subscriptionId],
    queryFn: async () => api.getHasSubscriptionFeatures(subscriptionId!),
    enabled: !!subscriptionId,
  });

  useEffect(() => {
    setIsFirstFetching(isFetching && !isRefetching);
  }, [isFetching, isRefetching]);

  useEffect(() => {
    if (hasSubscriptionFeatures && subscriptionId) {
      setStep(SubscriptionStep.SUCCESS);
    } else if (subscriptionId) {
      setStep(SubscriptionStep.SUBSCRIBE_FEATURES);
    } else {
      setStep(SubscriptionStep.SUBSCRIBE_EMAIL);
    }
  }, [subscriptionId, hasSubscriptionFeatures]);

  useEffect(() => {
    const subscribeParam = searchParams.get(SUBSCRIBE_MODAL_PARAM);
    setOpenModal(subscribeParam === 'true');
  }, [searchParams]);

  useEffect(() => {
    setSubscriptionId(subscriptionIdCookie);
  }, [subscriptionIdCookie]);

  const createSubscription = async (subscriptionEmail: string) => {
    setIsLoading(true);
    const response = await api.createSubscription(
      subscriptionEmail,
      productName,
      currentLang.value as LanguageValue
    );
    if (response !== null && 'error' in response) return { error: response.error };

    setSubscriptionIdCookie(response.subscriptionId);
    setIsLoading(false);
    return null;
  };

  const updateSubscriptionFeatures = async (
    subscriptionFeatures: string[]
  ): Promise<{ error: 'no-subscription-email' | 'failed-to-add-features' } | null> => {
    if (!subscriptionId) return { error: 'no-subscription-email' };
    setIsLoading(true);
    const response = await api.updateSubscriptionFeatures({
      subscriptionId,
      features: subscriptionFeatures,
    });
    if (response !== null && 'error' in response) return { error: response.error };
    refetchSubscriptionFeatures();
    setIsLoading(false);
    return null;
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
        subscriptionStep: step,
        createSubscription,
        updateSubscriptionFeatures,
        isLoading,
        isFirstFetching,
      }}
    >
      <SubscriptionModal />
      {children}
    </subscriptionContext.Provider>
  );
};
