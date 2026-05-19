"use client";

import { icons } from "lucide-react";

interface ServicesGrid4Props {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    items: Array<{ title: string; description: string; icon: string }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ServicesGrid4({ content, eyebrow, subtitle }: ServicesGrid4Props) {
  const resolvedEyebrow = eyebrow ?? content.eyebrow;
  const resolvedSubtitle = subtitle ?? content.subtitle;

  return (
    <section id="services" className="section-y">
      <div className="page-container">
        <div className="mb-12 text-center">
          {resolvedEyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
              {resolvedEyebrow}
            </p>
          )}
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {resolvedSubtitle && (
            <p className="mt-3 text-muted-foreground/70 max-w-2xl mx-auto">{resolvedSubtitle}</p>
          )}
          {content.description && !resolvedSubtitle && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, index) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];

            return (
              <div
                key={index}
                className="group rounded-[var(--radius-lg)] border border-border bg-card p-5 flex flex-col gap-3 transition-all duration-[var(--duration-normal)] hover:shadow-lg hover:-translate-y-1"
              >
                {LucideIcon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "color-mix(in srgb, var(--color-primary) 12%, transparent)" }}>
                    <LucideIcon className="size-5 text-primary" />
                  </div>
                )}
                <h3 className="text-sm font-semibold text-foreground leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
