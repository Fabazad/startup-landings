'use client';

import { MotionValue, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Tracks scroll position relative to the hero element as a MotionValue (0..100).
 * Uses motion values end-to-end so scroll updates never trigger a React re-render
 * of the hero subtree (which contains many animated SVGs and would otherwise
 * thrash the main thread during scroll — a major TBT contributor).
 */
export const useScrollPercent = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const heroHeight = useMotionValue(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    const update = () => {
      if (elementRef.current) heroHeight.set(elementRef.current.offsetHeight || 0);
    };
    update();

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined' && elementRef.current) {
      ro = new ResizeObserver(update);
      ro.observe(elementRef.current);
    } else {
      window.addEventListener('resize', update, { passive: true });
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', update);
    };
  }, [heroHeight]);

  const percent: MotionValue<number> = useTransform([scrollY, heroHeight], (latest) => {
    const [y, h] = latest as [number, number];
    if (!h) return 0;
    const p = Math.floor((y / h) * 100);
    return p >= 100 ? 100 : p;
  });

  return { elementRef, percent, scrollY };
};
