"use client";

import { icons, Clock, IndianRupee } from "lucide-react";

interface ProgramsCardGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      title: string;
      duration?: string;
      fee?: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    icon?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ProgramsCardGrid({ content, eyebrow, subtitle }: ProgramsCardGridProps) {
  return (
    <section id="programs" className="section-y">
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
            const LucideIcon = item.icon
              ? icons[item.icon as keyof typeof icons]
              : null;

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
                {(item.duration || item.fee) && (
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {item.duration && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {item.duration}
                      </span>
                    )}
                    {item.fee && (
                      <span className="flex items-center gap-1">
                        <IndianRupee size={12} /> {item.fee}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
