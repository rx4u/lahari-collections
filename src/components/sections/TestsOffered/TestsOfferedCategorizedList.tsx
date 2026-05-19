"use client";

import { useState } from "react";
import { ChevronDown, Home } from "lucide-react";

type Test = {
  name: string;
  price?: string;
  duration?: string;
  preparation?: string;
  homeCollection?: boolean;
};

type TestsOfferedContent = {
  headline: string;
  description?: string;
  categories?: Array<{ name: string; tests: Test[] }>;
  tests?: Array<Test & { category?: string }>;
};

export default function TestsOfferedCategorizedList({ content, eyebrow, subtitle }: { content: TestsOfferedContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description } = content;

  const categories: Array<{ name: string; tests: Test[] }> = content.categories
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

  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (i: number) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section className="section-y">
      <div className="page-container font-[family-name:var(--font-body)]">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">{headline}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>

        <div className="space-y-3">
          {categories.map((cat, i) => (
            <div key={i} className="border border-border rounded-[var(--radius-md)] overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 bg-muted hover:bg-muted/80 text-left"
              >
                <span className="font-semibold text-foreground">{cat.name}</span>
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {cat.tests.length}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform ${open[i] ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {open[i] && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-background text-muted-foreground">
                        <th className="text-left px-5 py-2 font-medium">Test Name</th>
                        <th className="text-left px-4 py-2 font-medium">Price</th>
                        <th className="text-left px-4 py-2 font-medium">Duration</th>
                        <th className="text-left px-4 py-2 font-medium">Home Collection</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.tests.map((t, j) => (
                        <tr key={j} className="border-b border-border last:border-0">
                          <td className="px-5 py-3 text-foreground font-medium">{t.name}</td>
                          <td className="px-4 py-3 text-foreground">{t.price ?? "—"}</td>
                          <td className="px-4 py-3 text-muted-foreground">{t.duration ?? "—"}</td>
                          <td className="px-4 py-3">
                            {t.homeCollection ? (
                              <Home size={14} className="text-primary" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
