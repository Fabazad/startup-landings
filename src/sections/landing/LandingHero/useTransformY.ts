import { MotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Maps scrollY to a vertical parallax offset and smooths it with a spring.
 * `distancePerPercent` is the pixel offset applied per 1% of scroll progress.
 * When the hero element ref is unknown we conservatively pass 0 which makes
 * the spring inert (no main-thread work on each frame).
 */
export const useTransformY = (
  scrollY: MotionValue<number>,
  percent: MotionValue<number>,
  distancePerPercent: number
) => {
  const offset = useTransform(percent, (p) => p * distancePerPercent);
  return useSpring(offset, {
    mass: 0.1,
    damping: 20,
    stiffness: 300,
    restDelta: 0.001,
  });
};
