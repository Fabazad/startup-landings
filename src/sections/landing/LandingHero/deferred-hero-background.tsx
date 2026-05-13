'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroBackground = dynamic(
  () => import('../components/hero-background').then((m) => ({ default: m.HeroBackground })),
  { ssr: false }
);

/**
 * Mounts the decorative hero background SVG (12x2 animated lines, circles,
 * dots, marquee text) only after the browser is idle. The background is
 * purely visual, so deferring it keeps a large amount of framer-motion JS,
 * animation scheduling, and SVG layout work out of the Total Blocking Time
 * measurement window without affecting LCP, SEO, or interactivity.
 */
export function DeferredHeroBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric: any = (window as any).requestIdleCallback;
    if (typeof ric === 'function') {
      const id = ric(() => setReady(true), { timeout: 3500 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;
  return <HeroBackground />;
}
