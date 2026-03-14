// app/providers.tsx

/* eslint-disable no-console */

'use client';

import { useEffect, useState } from 'react';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { CONFIG } from 'src/config-global';
import PostHogPageView from './posthog-page-view';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const initPostHog = async () => {
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

    // Defer PostHog init until browser is idle to avoid blocking LCP
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initPostHog);
    } else {
      setTimeout(initPostHog, 1000);
    }
  }, []);

  if (client) {
    return (
      <PHProvider client={client}>
        <PostHogPageView />
        {children}
      </PHProvider>
    );
  }

  return children;
}
