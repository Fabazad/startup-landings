'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// ----------------------------------------------------------------------

export type UseScrollOffSetTopReturn = {
  offsetTop: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
};

/**
 * Returns whether the page (or a tracked element) has scrolled past
 * `top` pixels. Uses a passive scroll listener with rAF throttling so we
 * stay off the main thread between frames — no framer-motion runtime
 * dependency. Removing this dependency keeps the eager landing chunk
 * free of framer-motion's scheduler/render code.
 */
export function useScrollOffSetTop(top = 0): UseScrollOffSetTopReturn {
  const elementRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        setOffsetTop(Math.round(rect.top) < top);
      } else {
        setOffsetTop(Math.round(window.scrollY) > top);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [top]);

  return useMemo(() => ({ elementRef, offsetTop }), [offsetTop]);
}

/*
 * 1: Applies to top <header/>
 * const { offsetTop } = useScrollOffSetTop(80);
 *
 * Or
 *
 * 2: Applies to element
 * const { offsetTop, elementRef } = useScrollOffSetTop(80);
 * <div ref={elementRef} />
 *
 */
