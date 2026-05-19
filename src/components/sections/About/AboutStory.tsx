"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AboutStoryProps {
  content: {
    headline: string;
    description: string;
    eyebrow?: string;
    subtitle?: string;
    stats?: Array<{ value: string; label: string }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function AboutStory({ content }: AboutStoryProps) {
  const { headline, description, eyebrow, stats } = content;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  const blurFade = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16, filter: "blur(8px)" },
          animate: inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
          transition: { duration: 0.6, ease: premiumEase, delay },
        };

  return (
    <section id="about" className="section-y">
      <div ref={ref} className="page-container">
        {eyebrow && (
          <motion.p
            {...blurFade(0)}
            className="text-xs font-medium uppercase tracking-[0.18em] mb-4"
            style={{ color: "color-mix(in oklch, var(--color-primary) 55%, transparent)" }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          {...blurFade(eyebrow ? 0.1 : 0)}
          className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground"
        >
          {headline}
        </motion.h2>
        <motion.p
          {...blurFade(eyebrow ? 0.2 : 0.1)}
          className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl"
        >
          {description}
        </motion.p>
        {stats && stats.length > 0 && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...blurFade((eyebrow ? 0.3 : 0.2) + i * 0.08)}
              >
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
