"use client";

import { useState } from "react";
import { icons, BookOpen } from "lucide-react";

interface ProgramsTabbedProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      title: string;
      duration?: string;
      fee?: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    icon?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ProgramsTabbed({ content, eyebrow, subtitle }: ProgramsTabbedProps) {
  const [activeTab, setActiveTab] = useState(0);
  const active = content.items[activeTab];
  const IconComponent = active?.icon ? (icons as Record<string, any>)[active.icon] || BookOpen : BookOpen;

  return (
    <section id="programs" className="section-y page-container">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 font-[family-name:var(--font-body)] text-muted-foreground">
            {content.description}
          </p>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-border pb-px mb-8">
        {content.items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`shrink-0 px-4 py-2 text-sm transition-colors whitespace-nowrap ${
              activeTab === index
                ? "border-b-2 border-primary text-primary font-semibold -mb-px"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.title.length > 20 ? item.title.slice(0, 20) + "…" : item.title}
          </button>
        ))}
      </div>

      {active && (
        <div className="max-w-2xl">
          <IconComponent className="mb-4 h-12 w-12 text-primary" />
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
            {active.title}
          </h3>
          <p className="mt-4 font-[family-name:var(--font-body)] text-muted-foreground">
            {active.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {active.duration && (
              <span className="rounded-[var(--radius-sm)] bg-muted px-3 py-1 text-sm text-foreground">
                {active.duration}
              </span>
            )}
            {active.fee && (
              <span className="rounded-[var(--radius-sm)] bg-muted px-3 py-1 text-sm text-foreground">
                {active.fee}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
