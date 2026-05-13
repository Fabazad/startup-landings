'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ProgressBar = dynamic(() => import('./progress-bar').then((m) => m.ProgressBar), {
  ssr: false,
});

export function DeferredProgressBar() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart'];

    const mount = () => {
      events.forEach((eventName) => window.removeEventListener(eventName, mount));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      setReady(true);
    };

    const listenerOpts: AddEventListenerOptions = { once: true, passive: true };
    events.forEach((eventName) => window.addEventListener(eventName, mount, listenerOpts));
    timeoutId = window.setTimeout(mount, 3500);

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, mount));
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;
  return <ProgressBar />;
}
