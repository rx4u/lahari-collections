"use client";

import { MapPin } from "lucide-react";

interface AreaGuideCardGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  areas: Array<{
      name: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    propertyCount?: number;
      image?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AreaGuideCardGrid({ content, eyebrow, subtitle }: AreaGuideCardGridProps) {
  return (
    <section id="area-guide" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.areas.map((area, i) => (
            <div key={i} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card">
              {area.image ? (
                <div className="aspect-[16/9]">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center bg-muted text-muted-foreground/40">
                  <MapPin size={32} />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground">{area.name}</h3>
                  {area.propertyCount != null && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {area.propertyCount} properties
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
