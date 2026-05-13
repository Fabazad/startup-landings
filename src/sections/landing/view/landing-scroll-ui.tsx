'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const InnerScrollUI = dynamic(
  () => import('./inner-scroll-ui').then((m) => ({ default: m.InnerScrollUI })),
  { ssr: false }
);

/**
 * Mounts the scroll-driven UI (progress bar + back-to-top) only after the
 * browser is idle, keeping its scroll listeners, spring, and framer-motion
 * subscriptions out of the Total Blocking Time window.
 */
export function LandingScrollUI() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric: any = (window as any).requestIdleCallback;
    if (typeof ric === 'function') {
      const id = ric(() => setReady(true), { timeout: 4000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;
  return <InnerScrollUI />;
}
