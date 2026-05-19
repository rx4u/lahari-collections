interface StatsDarkBandProps {
  content: {
    items: Array<{ value: string; label: string }>;
  };
}

export default function StatsDarkBand({ content }: StatsDarkBandProps) {
  return (
    <section
      className="py-14 md:py-16"
      style={{ background: "var(--color-forced-dark)", color: "var(--color-on-forced-dark)" }}
    >
      <div className="page-container">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {content.items.map((item, i) => (
            <div key={i} className="text-center">
              <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold" style={{ color: "var(--color-on-forced-dark)" }}>
                {item.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: "var(--color-on-forced-dark-muted)" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
