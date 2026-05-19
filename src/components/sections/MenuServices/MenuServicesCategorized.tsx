"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type MenuServicesContent = {
  headline: string;
  description?: string;
  categories: Array<{
    name: string;
    items: Array<{
      name: string;
      duration?: string;
      price: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
  }>;
  }>;
};

export default function MenuServicesCategorized({ content, eyebrow, subtitle }: { content: MenuServicesContent; eyebrow?: string; subtitle?: string }) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  function toggle(index: number) {
    setOpenSet((prev) => {
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
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground mb-3">
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-muted-foreground text-base max-w-xl mx-auto">{content.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {content.categories.map((category, idx) => {
            const isOpen = openSet.has(idx);
            return (
              <div key={category.name} className="border border-border rounded-[var(--radius-md)] overflow-hidden">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-muted transition-colors text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                      {category.name}
                    </span>
                    <span className="bg-muted rounded px-2 py-0.5 text-xs text-muted-foreground">
                      {category.items.length} {category.items.length === 1 ? "service" : "services"}
                    </span>
                  </div>
                  <ChevronDown
                    className="w-5 h-5 text-muted-foreground transition-transform duration-[var(--duration-normal)]"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-[var(--duration-normal)]"
                  style={{ maxHeight: isOpen ? `${category.items.length * 72}px` : "0px" }}
                >
                  <div className="px-5 pb-2">
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={item.name}
                        className={`flex items-center gap-4 py-3 ${itemIdx < category.items.length - 1 ? "border-b border-border" : ""}`}
                      >
                        <span className="flex-1 font-medium text-foreground text-sm">{item.name}</span>
                        {item.description && (
                          <span className="hidden md:block text-muted-foreground text-xs max-w-[200px] truncate">
                            {item.description}
                          </span>
                        )}
                        {item.duration && (
                          <span className="text-muted-foreground text-sm whitespace-nowrap">
                            {item.duration}
                          </span>
                        )}
                        <span className="text-primary font-semibold text-sm whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
