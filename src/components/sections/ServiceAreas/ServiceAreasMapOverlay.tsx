"use client";

import { icons } from "lucide-react";

interface ServiceAreasMapOverlayProps {
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
    icon?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ServiceAreasMapOverlay({ content, eyebrow, subtitle }: ServiceAreasMapOverlayProps) {
  return (
    <section id="service-areas" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/10 via-muted to-primary/5" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.areas.map((area, index) => {
                const LucideIcon = area.icon ? icons[area.icon as keyof typeof icons] : icons["MapPin"];
                return (
                  <div
                    key={index}
                    className="rounded-[var(--radius-lg)] border border-border bg-card/90 p-4 backdrop-blur"
                  >
                    <div className="flex items-center gap-2">
                      {LucideIcon && <LucideIcon className="size-4 text-primary" />}
                      <h3 className="font-medium text-foreground">{area.name}</h3>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
