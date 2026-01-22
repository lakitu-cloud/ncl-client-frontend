// src/components/motion/presets.ts
export const pageMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: {
    type: "spring" as const,
    damping: 25,
    stiffness: 200,
  },
};

export const springTransition = {
  type: "spring" as const,
    damping: 25,
    stiffness: 200,
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
