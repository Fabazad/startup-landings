// app/providers.tsx

/* eslint-disable no-console */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CONFIG } from 'src/config-global';

const PostHogRuntime = dynamic(() => import('./posthog-runtime'), { ssr: false });

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    let loaded = false;
    let timeoutId: number | undefined;
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

    const initPostHog = async () => {
      if (loaded) return;
      loaded = true;
      events.forEach((eventName) => window.removeEventListener(eventName, initPostHog));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      try {
        const { default: posthog } = await import('posthog-js');
        posthog.init(CONFIG.posthog.key, {
          api_host: CONFIG.posthog.host,
          person_profiles: 'identified_only',
          defaults: '2025-05-24',
          capture_pageview: false, // We handle pageview manually with PostHogPageView
        });
        setClient(posthog);
      } catch (error) {
        console.error('Failed to initialize PostHog', error);
      }
    };

    const listenerOpts: AddEventListenerOptions = { once: true, passive: true };
    events.forEach((eventName) => window.addEventListener(eventName, initPostHog, listenerOpts));
    timeoutId = window.setTimeout(initPostHog, 10000);

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, initPostHog));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (client) {
    return <PostHogRuntime client={client}>{children}</PostHogRuntime>;
  }

  return children;
}
