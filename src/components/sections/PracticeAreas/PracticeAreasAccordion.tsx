"use client";

import { useState } from "react";
import { icons, Scale, ChevronDown } from "lucide-react";

type PracticeAreasContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

export default function PracticeAreasAccordion({
  content,
  eyebrow,
  subtitle,
}: {
  content: PracticeAreasContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-[family-name:var(--font-display)]"
          >
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-muted-foreground mb-8 font-[family-name:var(--font-body)]">
              {content.description}
            </p>
          )}
          <div>
            {content.items.map((item, index) => {
              const IconComponent = (icons as Record<string, React.ElementType>)[item.icon] || Scale;
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-border">
                  <button
                    className="w-full flex items-center gap-3 py-[var(--spacing-md)] text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <IconComponent
                      className="shrink-0 text-primary"
                      size={20}
                    />
                    <span className="flex-1 font-semibold text-foreground font-[family-name:var(--font-body)]">
                      {item.title}
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-muted-foreground transition-transform duration-[var(--duration-normal)]"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-[var(--spacing-md)] pl-8 pr-2">
                      <p className="text-muted-foreground text-sm font-[family-name:var(--font-body)]">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
