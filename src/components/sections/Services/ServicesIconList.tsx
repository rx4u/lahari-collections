"use client";

import { icons } from "lucide-react";

interface ServicesIconListProps {
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

export default function ServicesIconList({ content, eyebrow, subtitle }: ServicesIconListProps) {
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

        <div className="space-y-6">
          {content.items.map((item, index) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];

            return (
              <div key={index} className="flex items-start gap-4">
                <div className="shrink-0 rounded-full bg-primary/10 p-3">
                  {LucideIcon && (
                    <LucideIcon className="size-6 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
