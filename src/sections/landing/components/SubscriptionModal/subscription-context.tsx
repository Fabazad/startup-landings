'use client';

import { createContext, useContext } from 'react';

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

export const subscriptionContext = createContext<SubscriptionContext>(null);

export const useSubscription = () => {
    const context = useContext(subscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};
