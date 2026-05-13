'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Snackbar = dynamic(() => import('./snackbar').then((m) => m.Snackbar), {
  ssr: false,
});

export function DeferredSnackbar() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);
    const ric: any = (window as any).requestIdleCallback;

    if (typeof ric === 'function') {
      const id = ric(mount, { timeout: 4000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }

    const timeoutId = window.setTimeout(mount, 2500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!ready) return null;
  return <Snackbar />;
}
