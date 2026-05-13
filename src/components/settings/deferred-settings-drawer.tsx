'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SettingsDrawer = dynamic(() => import('./drawer').then((m) => m.SettingsDrawer), {
  ssr: false,
});

export function DeferredSettingsDrawer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);
    const ric: any = (window as any).requestIdleCallback;

    if (typeof ric === 'function') {
      const id = ric(mount, { timeout: 8000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }

    const timeoutId = window.setTimeout(mount, 5000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;

  return <SettingsDrawer />;
}
