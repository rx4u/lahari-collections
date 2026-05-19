"use client";

import { useState } from "react";
import { Search, Home } from "lucide-react";

type Test = {
  name: string;
  category?: string;
  price?: string;
  duration?: string;
  preparation?: string;
  homeCollection?: boolean;
};

type TestsOfferedContent = {
  headline: string;
  description?: string;
  categories?: Array<{ name: string; tests: Test[] }>;
  tests?: Array<Test>;
};

export default function TestsOfferedSearchable({ content, eyebrow, subtitle }: { content: TestsOfferedContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description } = content;
  const [searchTerm, setSearchTerm] = useState("");

  const allTests: Test[] = content.tests
    ? content.tests
    : (content.categories ?? []).flatMap((cat) =>
        cat.tests.map((t) => ({ ...t, category: t.category ?? cat.name }))
      );

  const filtered = allTests.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="section-y">
      <div className="page-container font-[family-name:var(--font-body)]">
        <div className="mb-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">{headline}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>

        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tests..."
            className="w-full border border-border rounded-[var(--radius-sm)] pl-9 pr-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p>No tests found for &ldquo;{searchTerm}&rdquo;</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-card border border-border rounded-[var(--radius-sm)] px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-medium text-foreground truncate">{t.name}</span>
                  {t.category && (
                    <span className="bg-muted text-xs text-muted-foreground px-2 py-0.5 rounded shrink-0">
                      {t.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  {t.price && (
                    <span className="text-primary font-semibold text-sm">{t.price}</span>
                  )}
                  {t.duration && (
                    <span className="text-xs text-muted-foreground hidden sm:block">{t.duration}</span>
                  )}
                  {t.homeCollection && (
                    <Home size={14} className="text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
