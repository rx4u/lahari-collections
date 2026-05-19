"use client";

import { useState } from "react";
import { icons, BookOpen, ChevronDown } from "lucide-react";

interface ProgramsAccordionProps {
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

export default function ProgramsAccordion({ content, eyebrow, subtitle }: ProgramsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      <div className="max-w-2xl mx-auto">
        {content.items.map((item, index) => {
          const IconComponent = item.icon
            ? (icons as Record<string, any>)[item.icon] || BookOpen
            : BookOpen;
          const isOpen = openIndex === index;

          return (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-3 py-4 text-left"
              >
                <IconComponent className="h-5 w-5 shrink-0 text-primary" />
                <span className="flex-1 font-[family-name:var(--font-body)] font-semibold text-foreground">
                  {item.title}
                </span>
                {item.fee && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {item.fee}
                  </span>
                )}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-normal)] ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pb-4 pl-8">
                  <p className="font-[family-name:var(--font-body)] text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  {item.duration && (
                    <span className="mt-3 inline-block rounded-[var(--radius-sm)] bg-muted px-2 py-1 text-xs text-foreground">
                      {item.duration}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
