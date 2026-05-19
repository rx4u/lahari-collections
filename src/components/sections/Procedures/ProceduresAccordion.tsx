"use client";

import { useState } from "react";
import { ChevronDown, Clock, DollarSign } from "lucide-react";

interface ProceduresAccordionProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      name: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    duration?: string;
      cost?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ProceduresAccordion({ content, eyebrow, subtitle }: ProceduresAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section id="procedures" className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-border rounded-[var(--radius-lg)] border border-border">
          {content.items.map((item, index) => (
            <div key={index}>
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-medium text-foreground">{item.name}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-normal)] ${
                    openItems.has(index) ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems.has(index) && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  {(item.duration || item.cost) && (
                    <div className="mt-3 flex flex-wrap gap-4">
                      {item.duration && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="size-4" />
                          {item.duration}
                        </span>
                      )}
                      {item.cost && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <DollarSign className="size-4" />
                          {item.cost}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
