'use client';

import { useEffect } from 'react';

type Props = {
  websiteId: string;
  locale: string;
};

/**
 * Loads the Crisp chat script after the user shows intent (interaction)
 * or after a long idle delay. This keeps it out of TBT on the initial load.
 */
export function DeferredCrisp({ websiteId, locale }: Props) {
  useEffect(() => {
    let loaded = false;
    let timeoutId: number | undefined;
    const events: Array<keyof WindowEventMap> = [
      'scroll',
      'mousemove',
      'touchstart',
      'keydown',
      'click',
    ];

    const load = () => {
      if (loaded) return;
      loaded = true;
      events.forEach((e) => window.removeEventListener(e, load));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      (window as any).CRISP_RUNTIME_CONFIG = { locale };
      (window as any).$crisp = [];
      (window as any).CRISP_WEBSITE_ID = websiteId;

      const s = document.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      document.head.appendChild(s);
    };

    const listenerOpts: AddEventListenerOptions = { once: true, passive: true };
    events.forEach((e) => window.addEventListener(e, load, listenerOpts));

    timeoutId = window.setTimeout(load, 6000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, load));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [websiteId, locale]);

  return null;
}
