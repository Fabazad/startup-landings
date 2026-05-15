'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

// Renders children directly until the browser is idle, then loads
// `LazyMotion` and re-renders the tree wrapped in it. We use a runtime
// `import()` (instead of `next/dynamic`) so Next.js can't statically
// follow the import and inject the framer-motion chunks as
// `<script async>` tags during SSR — the whole point of deferring is
// that those chunks should not appear in the initial HTML payload.
//
// Motion components (`m.div`, etc.) fall back to plain HTML elements
// without LazyMotion in the tree, so the brief window before this
// resolves is visually identical to a non-animated render. Every
// motion-driven section on the landing page is itself dynamically
// imported and below the fold, so animations resolve before the user
// can scroll to them.

type Props = { children: React.ReactNode };

type LazyWrapper = ComponentType<{ children: React.ReactNode }>;

export function DeferredMotionLazy({ children }: Props) {
  const [Wrapper, setWrapper] = useState<LazyWrapper | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      if (cancelled) return;
      import('./motion-lazy').then((mod) => {
        if (!cancelled) setWrapper(() => mod.MotionLazy);
      });
    };

    const ric: any = (window as any).requestIdleCallback;
    if (typeof ric === 'function') {
      const id = ric(load, { timeout: 2500 });
      return () => {
        cancelled = true;
        (window as any).cancelIdleCallback?.(id);
      };
    }
    const t = window.setTimeout(load, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  if (!Wrapper) return children as React.ReactElement;
  return <Wrapper>{children}</Wrapper>;
}
