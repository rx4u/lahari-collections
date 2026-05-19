"use client";

import { icons } from "lucide-react";

interface ImpactStatsProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  stats: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ImpactStats({ content, eyebrow, subtitle }: ImpactStatsProps) {
  return (
    <section id="impact" className="section-y">
      <div className="page-container">
        <div className="rounded-[var(--radius-lg)] bg-primary/5 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{content.description}</p>
            )}
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats.map((stat, index) => {
              const LucideIcon = stat.icon ? icons[stat.icon as keyof typeof icons] : null;
              return (
                <div key={index} className="text-center">
                  {LucideIcon && (
                    <LucideIcon className="mx-auto mb-3 size-8 text-primary" />
                  )}
                  <p className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
