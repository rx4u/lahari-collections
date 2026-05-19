interface CaseResultsStatsProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  stats: Array<{
      value: string;
      label: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
  }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function CaseResultsStats({ content, eyebrow, subtitle }: CaseResultsStatsProps) {
  return (
    <section id="case-results" className="section-y">
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                {stat.label}
              </p>
              {stat.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
