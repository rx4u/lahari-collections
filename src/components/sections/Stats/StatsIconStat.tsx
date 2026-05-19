"use client";

import { icons } from "lucide-react";

interface StatsIconStatProps {
  content: {
    headline?: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  stats: Array<{
      value: string;
      label: string;
      icon: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function StatsIconStat({ content, eyebrow, subtitle }: StatsIconStatProps) {
  return (
    <section id="stats" className="section-y">
      <div className="page-container">
        {content.headline && (
          <div className="mb-12 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mt-4 text-muted-foreground">{content.description}</p>
            )}
          </div>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, index) => {
            const LucideIcon = icons[stat.icon as keyof typeof icons];
            return (
              <div key={index} className="text-center">
                {LucideIcon && (
                  <LucideIcon className="mx-auto mb-3 size-8 text-primary" />
                )}
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
