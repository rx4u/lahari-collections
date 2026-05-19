"use client";

import { icons } from "lucide-react";

interface AmenitiesIconGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      name: string;
      icon: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
  }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AmenitiesIconGrid({ content, eyebrow, subtitle }: AmenitiesIconGridProps) {
  return (
    <section id="amenities" className="section-y">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {content.items.map((item, i) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];

            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                  {LucideIcon && <LucideIcon className="size-6 text-primary" />}
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">{item.name}</p>
                {item.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
