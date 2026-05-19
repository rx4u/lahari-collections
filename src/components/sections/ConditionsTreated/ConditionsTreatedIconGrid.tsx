"use client";

import { icons } from "lucide-react";

interface ConditionsTreatedIconGridProps {
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

export default function ConditionsTreatedIconGrid({ content, eyebrow, subtitle }: ConditionsTreatedIconGridProps) {
  return (
    <section id="conditions-treated" className="section-y">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];

            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-border bg-card p-5"
              >
                {LucideIcon && (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary/10">
                    <LucideIcon className="size-5 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
