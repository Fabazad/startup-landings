// app/providers.tsx

'use client';

import { useEffect } from 'react';
import PostHogPageView from './posthog-page-view';
import { getPostHogClient } from './posthog-client';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let loaded = false;
    let timeoutId: number | undefined;
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

    const initPostHog = async () => {
      if (loaded) return;
      loaded = true;
      events.forEach((eventName) => window.removeEventListener(eventName, initPostHog));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      getPostHogClient().catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize PostHog', error);
      });
    };

    const listenerOpts: AddEventListenerOptions = { once: true, passive: true };
    events.forEach((eventName) => window.addEventListener(eventName, initPostHog, listenerOpts));
    timeoutId = window.setTimeout(initPostHog, 10000);

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, initPostHog));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <PostHogPageView />
      {children}
    </>
  );
}
