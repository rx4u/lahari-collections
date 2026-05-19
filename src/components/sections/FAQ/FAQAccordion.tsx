"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQAccordionProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      question: string;
      answer: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function FAQAccordion({ content, eyebrow, subtitle }: FAQAccordionProps) {
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
    <section id="faq" className="section-y">
      <div className="page-container">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground text-center">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            {content.description}
          </p>
        )}
        <div className="mt-12 max-w-3xl mx-auto divide-y divide-border">
          {content.items.map((item, index) => (
            <div key={index}>
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-4 text-left text-foreground font-medium"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-normal)] ${
                    openItems.has(index) ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openItems.has(index) && (
                <div className="pb-4 text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
