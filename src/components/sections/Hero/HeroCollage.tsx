"use client";

import { motion } from "framer-motion";
import type { HeroItem } from "@/lib/types";

interface HeroCollageProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  images?: (string | HeroItem)[];
}

export default function HeroCollage({
  headline,
  subheadline,
  cta,
  secondaryCta,
  images,
}: HeroCollageProps) {
  const hasImages = images && images.length > 0;
  const slides = images || [];

  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center">
      <div className="page-container py-16 sm:py-20 lg:py-24">
        <div className={`grid ${hasImages ? "md:grid-cols-2" : ""} gap-10 md:gap-16 items-center`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
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

          {hasImages && (
            <div className="relative h-[300px] sm:h-[400px] md:h-[460px]">
              {slides.slice(0, 4).map((item, i) => {
                const src = typeof item === "string" ? item : item.src;
                const alt = typeof item === "string" ? "" : (item.alt ?? "");
                const focalPoint = typeof item === "string" ? "center center" : (item.focalPoint ?? "center center");
                const positions = [
                  "top-0 left-0 w-[55%] h-[55%] z-30 rotate-[-2deg]",
                  "top-[10%] right-0 w-[50%] h-[50%] z-20 rotate-[3deg]",
                  "bottom-0 left-[8%] w-[48%] h-[48%] z-10 rotate-[2deg]",
                  "bottom-[5%] right-[5%] w-[44%] h-[44%] z-0 rotate-[-3deg]",
                ];
                return (
                  <motion.img
                    key={i}
                    src={src}
                    alt={alt}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    className={`absolute rounded-[var(--radius-lg)] object-cover shadow-xl ${positions[i]}`}
                    style={{ objectPosition: focalPoint }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
