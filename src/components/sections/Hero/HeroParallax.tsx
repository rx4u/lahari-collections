"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HeroParallaxProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  image?: string;
}

export default function HeroParallax({
  headline,
  subheadline,
  cta,
  secondaryCta,
  image,
}: HeroParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setOffset(-rect.top * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasImage = !!image;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      style={!hasImage ? { background: "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))" } : undefined}
    >
      {hasImage && (
        <div
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateY(${offset}px)`,
            willChange: "transform",
          }}
        />
      )}

      {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: darkening scrim over hero image */}
      {hasImage && <div className="absolute inset-0 bg-black/45" />}

      <div className="relative z-10 page-container text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${hasImage ? "text-[var(--color-on-image)]" : "text-[var(--color-on-primary)]"}`}
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`mt-6 text-lg sm:text-xl max-w-2xl mx-auto ${hasImage ? "text-[var(--color-on-image-muted)]" : "text-[var(--color-on-primary)]/80"}`}
        >
          {subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: button sits on darkened hero image */}
          <a href={cta.url} className="bg-white/90 text-foreground hover:bg-white rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block">
            {cta.text}
          </a>
          {secondaryCta && (
            // eslint-disable-next-line no-restricted-syntax -- photo overlay: outlined button on darkened hero image
            <a href={secondaryCta.url} className={`border ${hasImage ? "border-white/30 text-[var(--color-on-image)]" : "border-[var(--color-on-primary)]/30 text-[var(--color-on-primary)]"} hover:bg-white/10 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block`}>
              {secondaryCta.text}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
