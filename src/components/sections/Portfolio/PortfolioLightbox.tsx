"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type PortfolioItem = {
  title: string;
  category?: string;
  image?: string;
  description?: string;
  tags?: string[];
  cta?: { text: string; url: string };
};

type Props = {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    items: PortfolioItem[];
  };
  eyebrow?: string;
  subtitle?: string;
};

export default function PortfolioLightbox({ content, eyebrow, subtitle }: Props) {
  const { headline, description, items = [] } = content;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const prev = () => setSelectedIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  const next = () => setSelectedIndex((i) => (i !== null ? (i + 1) % items.length : null));

  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="group relative overflow-hidden rounded-[var(--radius-md)] bg-muted aspect-[4/3] block w-full"
            >
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[var(--duration-slow)]"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: hover scrim on portfolio thumbnail */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && selectedIndex !== null && (
        <div
          // eslint-disable-next-line no-restricted-syntax -- lightbox backdrop scrim
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            // eslint-disable-next-line no-restricted-syntax -- lightbox control on black backdrop
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={28} />
          </button>
          <button
            // eslint-disable-next-line no-restricted-syntax -- lightbox control on black backdrop
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={36} />
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            {selected.image ? (
              <img src={selected.image} alt={selected.title} className="w-full max-h-[70vh] object-contain rounded-[var(--radius-md)]"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
            ) : (
              <div className="w-full aspect-video bg-muted rounded-[var(--radius-md)]" />
            )}
            <div className="mt-4 text-center">
              {/* eslint-disable-next-line no-restricted-syntax -- lightbox caption on black backdrop */}
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-lg">{selected.title}</h3>
              {selected.description && <p className="text-gray-400 text-sm mt-1">{selected.description}</p>}
            </div>
          </div>
          <button
            // eslint-disable-next-line no-restricted-syntax -- lightbox control on black backdrop
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}
