"use client";

import { icons } from "lucide-react";

interface PracticeAreasIconGridProps {
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

export default function PracticeAreasIconGrid({ content, eyebrow, subtitle }: PracticeAreasIconGridProps) {
  return (
    <section id="practice-areas" className="section-y">
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
          {content.items.map((item, i) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];

            return (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] border border-border bg-card p-6"
              >
                {LucideIcon && (
                  <div className="mb-4 flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-primary/10">
                    <LucideIcon className="size-5 text-primary" />
                  </div>
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
