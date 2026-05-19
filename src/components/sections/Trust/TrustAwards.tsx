"use client";

import { Trophy } from "lucide-react";

interface AwardItem {
  name: string;
  awardedBy?: string;
  year?: string;
  logo?: string;
}

interface TrustAwardsProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    items: AwardItem[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function TrustAwards({ content, eyebrow, subtitle }: TrustAwardsProps) {
  const { headline, description, items } = content;

  return (
    <section id="trust" className="section-y bg-background">
      <div className="page-container">
        <div className="mb-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{description}</p>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-56 md:w-auto flex flex-col items-center gap-4 rounded-xl border border-border bg-gradient-to-b from-card to-muted/30 p-6 text-center"
            >
              {item.logo ? (
                <img src={item.logo} alt={item.name} className="h-14 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Trophy className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
              )}
              <div>
                <p className="font-[family-name:var(--font-display)] font-bold text-foreground leading-snug">
                  {item.name}
                </p>
                {item.awardedBy && (
                  <p className="mt-1 text-sm text-muted-foreground">{item.awardedBy}</p>
                )}
                {item.year && (
                  <p className="mt-1 text-xs text-muted-foreground font-medium">{item.year}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
