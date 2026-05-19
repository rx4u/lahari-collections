"use client";

import { icons } from "lucide-react";

interface ServicesIconGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      title: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    icon: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ServicesIconGrid({ content, eyebrow, subtitle }: ServicesIconGridProps) {
  return (
    <section id="services" className="section-y">
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
          {content.items.map((item, index) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];

            return (
              <div
                key={index}
                className="rounded-[var(--radius-lg)] border border-border bg-card p-6"
              >
                {LucideIcon && (
                  <LucideIcon className="mb-4 size-6 text-primary" />
                )}
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
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
