// app/providers.tsx
'use client';

import { useEffect } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { CONFIG } from 'src/config-global';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initPostHog = () => {
      posthog.init(CONFIG.posthog.key, {
        api_host: CONFIG.posthog.host,
        person_profiles: 'identified_only',
        defaults: '2025-05-24',
        capture_pageview: false, // Reduce initial network activity
      });
    };

    // Defer PostHog init until browser is idle to avoid blocking LCP
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initPostHog);
    } else {
      setTimeout(initPostHog, 1000);
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
