"use client";

import { Star } from "lucide-react";

interface TestimonialsGridProps {
  content: {
    headline: string;
    eyebrow?: string;
    subtitle?: string;
    items: Array<{
      name: string;
      text: string;
      rating?: number;
      role?: string;
      image?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function TestimonialsGrid({ content, eyebrow, subtitle }: TestimonialsGridProps) {
  const { headline, items } = content;
  const resolvedEyebrow = eyebrow ?? content.eyebrow;
  const resolvedSubtitle = subtitle ?? content.subtitle;

  if (!items || items.length === 0) return null;

  return (
    <section id="testimonials" className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          {resolvedEyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
              {resolvedEyebrow}
            </p>
          )}
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
            {headline}
          </h2>
          {resolvedSubtitle && (
            <p className="mt-3 text-muted-foreground/70 max-w-2xl mx-auto">{resolvedSubtitle}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="relative bg-card border border-border rounded-[var(--radius-lg)] p-6 transition-all duration-[var(--duration-normal)] hover:shadow-md hover:-translate-y-0.5 overflow-hidden">
              <span className="absolute -top-4 left-4 font-serif text-8xl font-bold leading-none pointer-events-none select-none" style={{ color: "var(--color-primary)", opacity: 0.08 }}>&ldquo;</span>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < (item.rating ?? 5) ? "fill-[var(--color-rating)] text-[var(--color-rating)]" : "text-muted-foreground/20 fill-muted-foreground/20"}
                  />
                ))}
              </div>

              <p className="text-foreground text-sm relative z-10">&ldquo;{item.text}&rdquo;</p>

              <div className="flex items-center gap-3 mt-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                )}
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  {item.role && (
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
