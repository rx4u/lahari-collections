"use client";

import { useState } from "react";
import { icons, Building2, ChevronDown, type LucideIcon } from "lucide-react";

interface DepartmentsAccordionProps {
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

export default function DepartmentsAccordion({ content, eyebrow, subtitle }: DepartmentsAccordionProps) {
  const { headline, description, departments } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        <div className="max-w-3xl mx-auto space-y-2">
          {departments.map((dept, i) => {
            const IconComponent: LucideIcon =
              (dept.icon ? (icons as Record<string, LucideIcon>)[dept.icon] : null) ?? Building2;
            const isOpen = openIndex === i;
            return (
              <div
                key={dept.name}
                className="border border-border rounded-[var(--radius-md)] overflow-hidden"
              >
                <button
                  className="w-full flex items-center gap-3 px-5 py-4 text-left bg-card hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <IconComponent className="w-5 h-5 text-primary shrink-0" />
                  <span className="flex-1 font-semibold text-foreground font-[family-name:var(--font-display)]">
                    {dept.name}
                  </span>
                  {dept.specialties && dept.specialties.length > 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">
                      {dept.specialties.length} specialties
                    </span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-3 bg-card border-t border-border">
                    <p className="text-muted-foreground text-sm font-[family-name:var(--font-body)]">
                      {dept.description}
                    </p>
                    {dept.head && (
                      <p className="text-sm text-foreground mt-3">
                        <span className="text-muted-foreground">Head:</span> {dept.head}
                      </p>
                    )}
                    {dept.specialties && dept.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {dept.specialties.map((s) => (
                          <span
                            key={s}
                            className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
