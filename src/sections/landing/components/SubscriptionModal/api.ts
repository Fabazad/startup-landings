import type { LanguageValue } from 'src/locales';

/**
 * Subscription API split out of `subscriptionModal.tsx` so axios is only
 * downloaded when the visitor actually submits the form. Static imports
 * pulled axios + its `buffer` polyfill (~50 KB) into the landing chunk
 * for every visit, even though >99% of sessions never open the modal.
 */

type CreateSubscriptionResult =
  | { error: 'failed-to-subscribe' }
  | { subscriptionId: number; isNewSubscription: boolean };

const loadAxios = () => import('axios').then((m) => m.default);

export async function createSubscription(
  email: string,
  productName: string,
  language: LanguageValue
): Promise<CreateSubscriptionResult> {
  const axios = await loadAxios();
  const response = await axios.post<{ subscriptionId: number; isNewSubscription: boolean }>(
    '/api/subscriptions',
    { email, product: productName, language },
    { validateStatus: () => true }
  );

  if (response.status !== 200) return { error: 'failed-to-subscribe' };
  return response.data;
}

export async function updateSubscriptionFeatures(params: {
  subscriptionId: number;
  features: string[];
}): Promise<{ error: 'failed-to-add-features' } | null> {
  const axios = await loadAxios();
  const response = await axios.put<{ features: string[] }>('/api/subscriptions', params);

  if (response.status !== 200) return { error: 'failed-to-add-features' };
  return null;
}

export async function getHasSubscriptionFeatures(subscriptionId: number): Promise<boolean> {
  const axios = await loadAxios();
  const response = await axios.get<{ hasFeatures: boolean }>('/api/subscriptions', {
    params: { subscriptionId },
  });
  return response.data.hasFeatures;
}
