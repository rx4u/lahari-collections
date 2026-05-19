interface StatRow {
  label: string;
  value: string;
}

interface StatsComparisonProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  before: {
      label: string;
      stats: StatRow[];
    };
    after: {
      label: string;
      stats: StatRow[];
    };
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function StatsComparison({ content, eyebrow, subtitle }: StatsComparisonProps) {
  const { headline, description, before, after } = content;

  return (
    <section className="section-y bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          <div className="flex-1 bg-card border border-border rounded-[var(--radius-md)] md:rounded-r-none p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              {before.label}
            </p>
            <div className="space-y-4">
              {before.stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground text-sm">{stat.label}</span>
                  <span className="text-2xl font-bold text-muted-foreground font-[family-name:var(--font-display)]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex md:flex-col items-center justify-center py-4 md:py-0 px-0 md:px-2 z-10">
            <div className="hidden md:block w-px flex-1 bg-border" />
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border text-xs font-bold text-muted-foreground shrink-0 shadow-sm">
              VS
            </span>
            <div className="hidden md:block w-px flex-1 bg-border" />
            <div className="block md:hidden h-px flex-1 bg-border" />
            <div className="block md:hidden h-px flex-1 bg-border" />
          </div>

          <div className="flex-1 bg-primary/5 border border-primary/30 rounded-[var(--radius-md)] md:rounded-l-none p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
              {after.label}
            </p>
            <div className="space-y-4">
              {after.stats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-foreground text-sm">{stat.label}</span>
                  <span className="text-2xl font-bold text-primary font-[family-name:var(--font-display)]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
