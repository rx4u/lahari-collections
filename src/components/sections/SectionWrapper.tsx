"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { AnimationTier } from "@/lib/types";
import { motionPresets } from "@/lib/animation";

interface SectionWrapperProps {
  children: React.ReactNode;
  tier: AnimationTier;
  className?: string;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: premiumEase,
      staggerChildren: 0.08,
    },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

export { staggerChild };

export default function SectionWrapper({ children, tier, className }: SectionWrapperProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (tier === "premium") {
    return (
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const preset = motionPresets[tier];

  return (
    <motion.div
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once: true, amount: 0.1 }}
      transition={preset.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
