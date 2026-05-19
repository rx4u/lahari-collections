interface StatsCounterProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    items: Array<{ value: string; label: string }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function StatsCounter({ content, eyebrow, subtitle }: StatsCounterProps) {
  return (
    <section id="stats" className="section-y">
      <div className="page-container">
        {content.headline && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-center mb-12">
            {content.headline}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {content.items.map((item, index) => (
            <div key={index}>
              <p className="text-4xl font-bold text-primary">{item.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
