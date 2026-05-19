type Test = {
  name: string;
  price?: string;
  duration?: string;
  preparation?: string;
  homeCollection?: boolean;
};

type Category = { name: string; tests: Test[] };

type TestsOfferedContent = {
  headline: string;
  description?: string;
  categories?: Category[];
  tests?: Array<Test & { category?: string }>;
};

export default function TestsOfferedCardGrid({ content, eyebrow, subtitle }: { content: TestsOfferedContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description } = content;

  const categories: Category[] = content.categories
    ? content.categories
    : (() => {
        const map: Record<string, Test[]> = {};
        (content.tests ?? []).forEach((t) => {
          const cat = t.category ?? "General";
          if (!map[cat]) map[cat] = [];
          map[cat].push(t);
        });
        return Object.entries(map).map(([name, tests]) => ({ name, tests }));
      })();

  return (
    <section className="section-y">
      <div className="page-container font-[family-name:var(--font-body)]">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">{headline}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>

        {categories.map((cat, ci) => (
          <div key={ci} className="mb-8">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
              {cat.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cat.tests.map((t, ti) => (
                <div
                  key={ti}
                  className="bg-card border border-border rounded-[var(--radius-sm)] p-4 flex flex-col gap-1"
                >
                  <div className="font-semibold text-foreground text-sm leading-snug">{t.name}</div>
                  {t.price && (
                    <div className="text-primary font-bold text-base">{t.price}</div>
                  )}
                  {t.duration && (
                    <div className="text-xs text-muted-foreground">{t.duration}</div>
                  )}
                  {t.preparation && (
                    <div className="text-xs italic text-muted-foreground mt-1">{t.preparation}</div>
                  )}
                  {t.homeCollection && (
                    <span className="mt-2 inline-block bg-primary/10 text-primary text-xs px-2 py-0.5 rounded self-start">
                      Home Collection
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
