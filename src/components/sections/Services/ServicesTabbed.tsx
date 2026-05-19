"use client";

import { useState } from "react";
import { icons } from "lucide-react";

interface ServicesTabbedProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    categories: Array<{
      name: string;
      items: Array<{
        title: string;
        description: string;
    eyebrow?: string;
    subtitle?: string;
      icon: string;
        price?: string;
      }>;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ServicesTabbed({ content, eyebrow, subtitle }: ServicesTabbedProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-border">
          {content.categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === index
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.categories[activeTab]?.items.map((item, index) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];
            return (
              <div key={index} className="rounded-[var(--radius-lg)] border border-border bg-card p-6">
                {LucideIcon && <LucideIcon className="mb-4 size-6 text-primary" />}
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                {item.price && (
                  <p className="mt-3 text-lg font-semibold text-primary">{item.price}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
