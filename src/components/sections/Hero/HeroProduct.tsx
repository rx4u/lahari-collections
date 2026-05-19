"use client";

import { motion } from "framer-motion";

interface HeroProductProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  image?: string;
}

export default function HeroProduct({
  headline,
  subheadline,
  cta,
  secondaryCta,
  image,
}: HeroProductProps) {
  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center">
      <div className="page-container py-16 sm:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              {subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={cta.url} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block">
                {cta.text}
              </a>
              {secondaryCta && (
                <a href={secondaryCta.url} className="border border-border text-foreground hover:bg-accent rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block">
                  {secondaryCta.text}
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            {image ? (
              <motion.img
                src={image}
                alt={headline}
                animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-md rounded-xl object-cover shadow-2xl"
              />
            ) : (
              <div
                className="w-full max-w-md aspect-square rounded-xl"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))" }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
