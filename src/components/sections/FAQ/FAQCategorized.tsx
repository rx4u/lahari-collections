'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

interface FAQCategorizedProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    categories: FAQCategory[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function FAQCategorized({ content, eyebrow, subtitle }: FAQCategorizedProps) {
  const { headline, description, categories } = content;
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setOpenItems(new Set());
  };

  const activeItems = categories[activeCategory]?.items ?? [];

  return (
    <section className="section-y bg-background">
      <div className="page-container px-4">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:w-48 shrink-0 pb-2 md:pb-0">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(i)}
                className={`whitespace-nowrap px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors text-left ${
                  i === activeCategory
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          <div className="flex-1 divide-y divide-border border border-border rounded-[var(--radius-md)] overflow-hidden">
            {activeItems.map((item, i) => {
              const isOpen = openItems.has(i);
              return (
                <div key={i} className="bg-card">
                  <button
                    onClick={() => toggleItem(i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                  >
                    <span className="text-foreground font-medium">{item.question}</span>
                    <ChevronDown
                      className={`shrink-0 w-4 h-4 text-muted-foreground transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
            {activeItems.length === 0 && (
              <div className="px-6 py-8 text-center text-muted-foreground text-sm">
                No items in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
