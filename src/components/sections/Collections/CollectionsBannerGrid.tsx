"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface CollectionsBannerGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    collections: Array<{
      name: string;
      description?: string;
      eyebrow?: string;
      subtitle?: string;
      image?: string;
      itemCount?: number;
      cta?: { text: string; url: string };
      featured?: boolean;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
  borderless?: boolean;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function CollectionsBannerGrid({ content, borderless }: CollectionsBannerGridProps) {
  const { headline, description, collections } = content;
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-y">
      <div className="page-container">
        <motion.div
          className="text-center mb-10"
          initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: premiumEase }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base">
              {description}
            </p>
          )}
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((col, i) => (
            <motion.div
              key={i}
              initial={reducedMotion ? undefined : { opacity: 0, y: 40, scale: 0.95 }}
              animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{
                duration: 0.6,
                ease: premiumEase,
                delay: i * 0.15,
              }}
              whileHover={reducedMotion ? undefined : {
                y: -4,
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className={`group relative overflow-hidden ${borderless ? "rounded-none" : "rounded-[var(--radius-lg)]"} ${
                col.featured ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden bg-muted ${
                  col.featured ? "aspect-[2/1]" : "aspect-[4/3]"
                }`}
              >
                {col.image ? (
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-[var(--duration-slower)] group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}

                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: gradient scrim over banner image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: headline on darkened banner image */}
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-white text-xl md:text-2xl leading-tight">
                        {col.name}
                      </h3>
                      {col.description && (
                        // eslint-disable-next-line no-restricted-syntax -- photo overlay: description on darkened banner image
                        <p className="text-white/80 text-sm mt-1 line-clamp-2">
                          {col.description}
                        </p>
                      )}
                      {col.itemCount !== undefined && (
                        // eslint-disable-next-line no-restricted-syntax -- photo overlay: count pill on darkened banner image
                        <span className="inline-block mt-2 text-xs text-white/70 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full">
                          {col.itemCount} items
                        </span>
                      )}
                    </div>
                    {col.cta && (
                      <a
                        href={col.cta.url}
                        className="shrink-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[var(--duration-slow)] bg-[var(--color-primary)] text-[var(--color-on-primary)] text-sm font-medium px-4 py-2 rounded-[var(--radius-sm)] whitespace-nowrap"
                      >
                        {col.cta.text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
