"use client";

import { useState } from "react";
import { icons, Building2, type LucideIcon } from "lucide-react";

interface DepartmentsTabbedProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  departments: Array<{
      name: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    icon?: string;
      head?: string;
      specialties?: string[];
      image?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function DepartmentsTabbed({ content, eyebrow, subtitle }: DepartmentsTabbedProps) {
  const { headline, description, departments } = content;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = departments[activeIndex];

  const IconComponent: LucideIcon =
    (active?.icon ? (icons as Record<string, LucideIcon>)[active.icon] : null) ?? Building2;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              {description}
            </p>
          )}
        </div>

        {/* Mobile: horizontal scroll tabs */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {departments.map((dept, i) => (
            <button
              key={dept.name}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
                activeIndex === i
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Desktop: vertical tabs + content panel */}
        <div className="hidden md:flex gap-8">
          <ul className="w-56 shrink-0 space-y-1">
            {departments.map((dept, i) => (
              <li key={dept.name}>
                <button
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left px-4 py-3 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
                    activeIndex === i
                      ? "bg-primary/10 border-l-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {dept.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex-1 bg-card border border-border rounded-[var(--radius-lg)] p-8">
            {active && (
              <>
                <IconComponent className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold text-foreground font-[family-name:var(--font-display)]">
                  {active.name}
                </h3>
                <p className="text-muted-foreground mt-3 font-[family-name:var(--font-body)]">
                  {active.description}
                </p>
                {active.head && (
                  <p className="text-sm text-foreground mt-4">
                    <span className="text-muted-foreground">Head:</span> {active.head}
                  </p>
                )}
                {active.specialties && active.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {active.specialties.map((s) => (
                      <span key={s} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile: content panel */}
        <div className="md:hidden bg-card border border-border rounded-[var(--radius-lg)] p-6">
          {active && (
            <>
              <IconComponent className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-display)]">
                {active.name}
              </h3>
              <p className="text-muted-foreground text-sm mt-2 font-[family-name:var(--font-body)]">
                {active.description}
              </p>
              {active.head && (
                <p className="text-xs text-foreground mt-3">
                  <span className="text-muted-foreground">Head:</span> {active.head}
                </p>
              )}
              {active.specialties && active.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {active.specialties.map((s) => (
                    <span key={s} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
