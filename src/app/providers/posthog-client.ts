import { CONFIG } from 'src/config-global';

type PostHogClient = typeof import('posthog-js').default;

let clientPromise: Promise<PostHogClient> | null = null;

export function getPostHogClient() {
  if (!clientPromise) {
    clientPromise = import('posthog-js').then(({ default: posthog }) => {
      posthog.init(CONFIG.posthog.key, {
        api_host: CONFIG.posthog.host,
        person_profiles: 'identified_only',
        defaults: '2025-05-24',
        capture_pageview: false,
      });

      return posthog;
    });
  }

  return clientPromise;
}

export async function capturePostHog(event: string, properties?: Record<string, unknown>) {
  try {
    const posthog = await getPostHogClient();
    posthog.capture(event, properties);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to capture PostHog event', error);
  }
}
