"use client";

import { useState } from "react";

type ProceduresContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  items: Array<{
    name: string;
    description: string;
    duration?: string;
    cost?: string;
  }>;
};

export default function ProceduresTabbed({
  content,
  eyebrow,
  subtitle,
}: {
  content: ProceduresContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, items } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <section className="section-y max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-foreground mb-3">
          {headline}
        </h2>
        {description && (
          <p className="font-[family-name:var(--font-body)] text-muted-foreground text-lg">
            {description}
          </p>
        )}
      </div>

      <div className="overflow-x-auto pb-2 mb-8">
        <div className="flex gap-2 min-w-max">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-[var(--radius-sm)] text-sm font-[family-name:var(--font-body)] font-medium whitespace-nowrap transition-colors ${
                i === activeIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="bg-card border border-border rounded-[var(--radius-md)] p-8">
          <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-foreground mb-4">
            {active.name}
          </h3>
          <p className="font-[family-name:var(--font-body)] text-muted-foreground leading-relaxed mb-6">
            {active.description}
          </p>

          {(active.duration || active.cost) && (
            <div className="flex flex-wrap gap-3">
              {active.duration && (
                <div className="bg-muted rounded-[var(--radius-sm)] px-4 py-2">
                  <span className="font-[family-name:var(--font-body)] text-xs text-muted-foreground uppercase tracking-wide block mb-0.5">
                    Duration
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-foreground">
                    {active.duration}
                  </span>
                </div>
              )}
              {active.cost && (
                <div className="bg-muted rounded-[var(--radius-sm)] px-4 py-2">
                  <span className="font-[family-name:var(--font-body)] text-xs text-muted-foreground uppercase tracking-wide block mb-0.5">
                    Cost
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-primary">
                    {active.cost}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
