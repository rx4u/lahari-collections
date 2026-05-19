"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroItem } from "@/lib/types";

interface HeroCarouselProps {
  headline: string;
  subheadline: string;
  eyebrow?: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  images?: (string | HeroItem)[];
}

function resolveItem(item: string | HeroItem) {
  const src = typeof item === "string" ? item : item.src;
  const alt = typeof item === "string" ? "" : (item.alt ?? "");
  const focalPoint = typeof item === "string" ? "center center" : (item.focalPoint ?? "center center");
  return { src, alt, focalPoint };
}

const SLIDE_DURATION = 5000;

export default function HeroCarousel({
  headline,
  subheadline,
  eyebrow,
  cta,
  secondaryCta,
  images,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const slides = images?.length ? images : [];
  const count = Math.max(slides.length, 1);

  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);

  useEffect(() => {
    if (count <= 1) return;
    setProgress(0);
    const start = Date.now();
    const tickMs = 80;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) {
        clearInterval(interval);
        next();
      }
    }, tickMs);
    return () => clearInterval(interval);
  }, [current, count, next]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{
        background: slides.length
          ? undefined
          : "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))",
      }}
    >
      {/* Slide layer */}
      {slides.length > 0 && (
        <AnimatePresence mode="sync">
          {(() => {
            const { src, alt, focalPoint } = resolveItem(slides[current]);
            return (
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <motion.img
                  src={src}
                  alt={alt}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1.0 }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: focalPoint }}
                />
              </motion.div>
            );
          })()}
        </AnimatePresence>
      )}

      {/* Bottom-anchored gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 60%)",
        }}
      />

      {/* Content — editorial bottom-left */}
      <div className="relative z-10 w-full pb-16 sm:pb-20 md:pb-24 px-6 sm:px-10 md:px-16 lg:px-24">
        {eyebrow && (
          <motion.p
            key={`eb-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-white"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          key={`h-${current}`}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-white max-w-4xl"
        >
          {headline}
        </motion.h1>
        <motion.p
          key={`s-${current}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base sm:text-lg md:text-xl text-white max-w-2xl leading-relaxed"
        >
          {subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href={cta.url}
            className="rounded-[var(--radius-md)] px-7 py-3.5 text-sm font-medium transition-colors inline-block"
            style={{
              backgroundColor: "var(--color-tertiary)",
              color: "var(--color-on-primary)",
            }}
          >
            {cta.text}
          </a>
          {secondaryCta && (
            // eslint-disable-next-line no-restricted-syntax -- on darkened photo
            <a
              href={secondaryCta.url}
              className="border border-white/40 text-white hover:bg-white/10 rounded-[var(--radius-md)] px-7 py-3.5 text-sm font-medium transition-colors inline-block"
            >
              {secondaryCta.text}
            </a>
          )}
        </motion.div>

        {/* Progress indicators — under the content, left-aligned */}
        {count > 1 && (
          <div className="mt-12 flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] text-white/70 tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex gap-2 ml-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  // eslint-disable-next-line no-restricted-syntax -- on darkened photo
                  className="h-[2px] w-12 bg-white/25 overflow-hidden cursor-pointer"
                >
                  {i === current && (
                    <div
                      // eslint-disable-next-line no-restricted-syntax -- on darkened photo
                      className="h-full bg-white"
                      style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
                    />
                  )}
                  {i < current && (
                    // eslint-disable-next-line no-restricted-syntax -- on darkened photo
                    <div className="h-full w-full bg-white/80" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
