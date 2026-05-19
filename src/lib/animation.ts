import type { AnimationTier } from "./types";

export interface MotionPreset {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  transition: Record<string, number | string | number[]>;
}

const subtle: MotionPreset = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const standard: MotionPreset = {
  initial: { opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const premium: MotionPreset = {
  initial: { opacity: 0, y: 32, scale: 0.97, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export const motionPresets: Record<AnimationTier, MotionPreset> = {
  subtle,
  standard,
  premium,
};

export function getStaggerDelay(index: number, tier: AnimationTier): number {
  const delays: Record<AnimationTier, number> = {
    subtle: 0.08,
    standard: 0.1,
    premium: 0.12,
  };
  return index * delays[tier];
}
