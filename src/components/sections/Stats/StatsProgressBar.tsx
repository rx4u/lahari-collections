"use client";

interface StatsProgressBarProps {
  content: {
    headline?: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  stats: Array<{
      label: string;
      value: number;
      displayValue?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function StatsProgressBar({ content, eyebrow, subtitle }: StatsProgressBarProps) {
  return (
    <section id="stats" className="section-y">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {content.headline && (
          <div className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mt-4 text-muted-foreground">{content.description}</p>
            )}
          </div>
        )}
        <div className="space-y-6">
          {content.stats.map((stat, index) => (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{stat.label}</span>
                <span className="text-sm font-semibold text-primary">
                  {stat.displayValue ?? `${stat.value}%`}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(stat.value, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
