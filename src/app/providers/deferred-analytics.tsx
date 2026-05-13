'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((m) => ({ default: m.Analytics })),
  { ssr: false }
);

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => ({ default: m.SpeedInsights })),
  { ssr: false }
);

export function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);
    const ric: any = (window as any).requestIdleCallback;
    if (typeof ric === 'function') {
      const id = ric(mount, { timeout: 4000 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(mount, 2500);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
