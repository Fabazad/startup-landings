'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState, useMemo, useCallback } from 'react';
import { useOptionalProductIdea } from 'src/app/product-idea-provider';
import { useCookies } from 'src/hooks/use-cookies';
import { LanguageValue, useTranslate } from 'src/locales';
import { useSearchParams } from 'src/routes/hooks';
import * as api from './api';
import { SubscriptionStep, subscriptionContext } from './subscription-context';

const SubscriptionModalView = dynamic(() => import('./subscription-modal-view'), { ssr: false });

const SUBSCRIBE_MODAL_PARAM = 'subscribeModal';
const SUBSCRIPTION_ID_COOKIE = 'subscriptionId';

function SubscriptionModalProviderInner({ children }: { children: React.ReactNode }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstFetching, setIsFirstFetching] = useState(true);
  const searchParams = useSearchParams();
  const { name: productName } = useOptionalProductIdea() ?? { name: '' };

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

  const createSubscription = useCallback(
    async (subscriptionEmail: string) => {
      setIsLoading(true);
      const response = await api.createSubscription(
        subscriptionEmail,
        productName,
        currentLang.value as LanguageValue
      );
      if (response !== null && 'error' in response) return { error: response.error };

      setSubscriptionIdCookie(response.subscriptionId);
      if (!response.isNewSubscription) {
        // Lazy load `sonner` (and the i18next runtime t-function) here so
        // they don't show up in the landing chunk. The "already subscribed"
        // toast is a rare path triggered by a small subset of users.
        const [{ toast }, { t }] = await Promise.all([import('sonner'), import('i18next')]);
        toast.info(t('landing.subscription.already-subscribed'));
      }
      setIsLoading(false);
      return null;
    },
    [productName, currentLang.value, setSubscriptionIdCookie]
  );

  const updateSubscriptionFeatures = useCallback(
    async (
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
    },
    [subscriptionId, refetchSubscriptionFeatures]
  );

  const handleSetOpenModal = useCallback((isOpen: boolean) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (isOpen) {
      url.searchParams.set(SUBSCRIBE_MODAL_PARAM, 'true');
    } else {
      url.searchParams.delete(SUBSCRIBE_MODAL_PARAM);
    }
    window.history.pushState({}, '', url.toString());
  }, []);

  const memoizedValue = useMemo(
    () => ({
      openModal,
      setOpenModal: handleSetOpenModal,
      subscriptionStep: step,
      createSubscription,
      updateSubscriptionFeatures,
      isLoading,
      isFirstFetching,
    }),
    [
      openModal,
      handleSetOpenModal,
      step,
      createSubscription,
      updateSubscriptionFeatures,
      isLoading,
      isFirstFetching,
    ]
  );

  // Only mount the modal view once it's actually been requested. Otherwise
  // its chunk (TextField + react-hook-form + zod + sonner) loads on every
  // landing visit, even though the modal is opened by a tiny fraction of
  // users. Once mounted we keep it mounted so the dialog can animate close.
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  useEffect(() => {
    if (openModal) setHasOpenedOnce(true);
  }, [openModal]);

  return (
    <subscriptionContext.Provider value={memoizedValue}>
      {hasOpenedOnce && <SubscriptionModalView />}
      {children}
    </subscriptionContext.Provider>
  );
}

export function SubscriptionModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <SubscriptionModalProviderInner>{children}</SubscriptionModalProviderInner>
    </Suspense>
  );
}
