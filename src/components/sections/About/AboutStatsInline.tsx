"use client";

interface AboutStatsInlineProps {
  content: {
    headline: string;
    description: string;
    eyebrow?: string;
    subtitle?: string;
  stats: Array<{
      value: string;
      label: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AboutStatsInline({ content, eyebrow, subtitle }: AboutStatsInlineProps) {
  return (
    <section id="about" className="section-y">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
          {content.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{content.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2"
            >
              <span className="text-lg font-bold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
