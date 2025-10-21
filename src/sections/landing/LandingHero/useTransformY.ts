import { MotionValue, useSpring, useTransform } from 'framer-motion';

export const useTransformY = (value: MotionValue<number>, distance: number) => {
  const physics = {
    mass: 0.1,
    damping: 20,
    stiffness: 300,
    restDelta: 0.001,
  };

  return useSpring(useTransform(value, [0, 1], [0, distance]), physics);
};
