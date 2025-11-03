// app/providers.tsx
'use client';

import { useEffect } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { CONFIG } from 'src/config-global';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(CONFIG.posthog.key, {
      api_host: CONFIG.posthog.host,
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      defaults: '2025-05-24',
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
