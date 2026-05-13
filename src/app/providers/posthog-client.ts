import { CONFIG } from 'src/config-global';

type PostHogClient = typeof import('posthog-js').default;

let clientPromise: Promise<PostHogClient> | null = null;

const deferredEvents: Array<keyof WindowEventMap> = [
  'pointerdown',
  'keydown',
  'scroll',
  'touchstart',
];

export function getPostHogClient() {
  if (!clientPromise) {
    clientPromise = import('posthog-js').then(({ default: posthog }) => {
      posthog.init(CONFIG.posthog.key, {
        api_host: CONFIG.posthog.host,
        person_profiles: 'identified_only',
        defaults: '2025-05-24',
        capture_pageview: false,
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
      } as Parameters<typeof posthog.init>[1]);

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

export function capturePostHogAfterIntent(
  event: string,
  properties?: Record<string, unknown>,
  maxDelay = 15000
) {
  let captured = false;
  let timeoutId: number | undefined;

  const capture = () => {
    if (captured) return;
    captured = true;
    deferredEvents.forEach((eventName) => window.removeEventListener(eventName, capture));
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    capturePostHog(event, properties);
  };

  const listenerOpts: AddEventListenerOptions = { once: true, passive: true };
  deferredEvents.forEach((eventName) => window.addEventListener(eventName, capture, listenerOpts));
  timeoutId = window.setTimeout(capture, maxDelay);

  return () => {
    deferredEvents.forEach((eventName) => window.removeEventListener(eventName, capture));
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}
