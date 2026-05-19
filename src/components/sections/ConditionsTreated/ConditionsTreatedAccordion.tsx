"use client";

import { useState } from "react";
import { ChevronDown, icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

type ConditionItem = {
  name: string;
  icon: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  category?: string;
};

type ConditionsTreatedAccordionContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  items: ConditionItem[];
};

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (icons as Record<string, React.FC<LucideProps>>)[name];
  return Icon ? <Icon {...props} /> : null;
}

export default function ConditionsTreatedAccordion({
  content,
  eyebrow,
  subtitle,
}: {
  content: ConditionsTreatedAccordionContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, items } = content;
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  // Group by category
  const hasCategories = items.some((i) => i.category);
  const groups: Record<string, ConditionItem[]> = {};

  if (hasCategories) {
    items.forEach((item) => {
      const cat = item.category ?? "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
  }

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground font-[family-name:var(--font-body)]">{description}</p>
          )}
        </div>

        <div className="space-y-2 max-w-3xl">
          {hasCategories
            ? Object.entries(groups).map(([cat, catItems]) => {
                const isOpen = open.has(cat);
                return (
                  <div key={cat} className="border border-border rounded-[var(--radius-md)] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggle(cat)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted transition-colors"
                    >
                      <span className="font-semibold text-foreground text-sm font-[family-name:var(--font-body)]">
                        {cat}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                          {catItems.length} conditions
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3 pt-1 bg-card border-t border-border space-y-2">
                        {catItems.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 py-1">
                            <DynamicIcon name={item.icon} size={16} className="text-primary shrink-0" />
                            <span className="text-sm text-foreground font-[family-name:var(--font-body)]">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            : items.map((item, i) => {
                const key = `item-${i}`;
                const isOpen = open.has(key);
                return (
                  <div key={i} className="border border-border rounded-[var(--radius-md)] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <DynamicIcon name={item.icon} size={16} className="text-primary" />
                        <span className="font-medium text-foreground text-sm font-[family-name:var(--font-body)]">
                          {item.name}
                        </span>
                      </div>
                      {item.description && (
                        <ChevronDown
                          size={16}
                          className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    {isOpen && item.description && (
                      <div className="px-4 pb-3 pt-1 bg-card border-t border-border">
                        <p className="text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                          {item.description}
                        </p>
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
