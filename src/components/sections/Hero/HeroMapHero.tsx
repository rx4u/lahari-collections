"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface HeroMapHeroProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  mapUrl?: string;
}

export default function HeroMapHero({
  headline,
  subheadline,
  cta,
  secondaryCta,
  mapUrl,
}: HeroMapHeroProps) {
  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {mapUrl ? (
        <iframe
          src={mapUrl}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location map"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))" }}
        />
      )}

      {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: darkening scrim over hero image */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 page-container w-full py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 sm:p-10 max-w-lg"
        >
          <div className="flex items-center gap-2 text-[var(--color-primary)] mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider font-[family-name:var(--font-display)]">
              Our Location
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{subheadline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
