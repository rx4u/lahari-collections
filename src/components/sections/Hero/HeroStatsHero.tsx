"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface HeroStatsHeroProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

function parseStatValue(raw: string): { numeric: number; suffix: string } | null {
  const match = raw.match(/^([\d,]+)\s*(\+|%|K|M|x)?$/i);
  if (!match) return null;
  return { numeric: parseInt(match[1].replace(/,/g, ""), 10), suffix: match[2] || "" };
}

const defaultStats = [
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function HeroStatsHero({
  headline,
  subheadline,
  cta,
  secondaryCta,
}: HeroStatsHeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))" }}
    >
      <div className="page-container text-center py-16 sm:py-20 lg:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-on-primary)]"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg sm:text-xl text-[var(--color-on-primary)]/80 max-w-2xl mx-auto"
        >
          {subheadline}
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {defaultStats.map((stat, i) => {
            const parsed = parseStatValue(stat.value);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-[var(--color-on-primary)] font-[family-name:var(--font-display)]">
                  {parsed ? (
                    <AnimatedNumber value={parsed.numeric} suffix={parsed.suffix} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="mt-2 text-sm text-[var(--color-on-primary)]/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a href={cta.url} className="bg-card text-foreground hover:bg-card/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block">
            {cta.text}
          </a>
          {secondaryCta && (
            <a href={secondaryCta.url} className="border border-[var(--color-on-primary)]/30 text-[var(--color-on-primary)] hover:bg-[var(--color-on-primary)]/10 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block">
              {secondaryCta.text}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
