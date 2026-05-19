"use client";

import { useState } from "react";

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

export default function PortfolioCategorized({ content, eyebrow, subtitle }: Props) {
  const { headline, description, items = [] } = content;

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[]))];
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

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

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              style={
                active === cat
                  ? { backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }
                  : { backgroundColor: "transparent", border: "1px solid var(--color-neutral)", color: "inherit" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div key={i} className="break-inside-avoid group relative overflow-hidden rounded-[var(--radius-md)] bg-muted">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/3] object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-muted" />
              )}
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: hover scrim on portfolio image */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full mb-2 self-start"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  {item.category}
                </span>
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: title on darkened portfolio image */}
                <p className="font-[family-name:var(--font-display)] font-semibold text-white text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
