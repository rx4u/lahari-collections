"use client";

import { useState } from "react";
import { icons } from "lucide-react";

interface ServicesDetailedAccordionProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    items: Array<{
      title: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    icon: string;
      duration?: string;
      price?: string;
      cta?: { text: string; url: string };
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ServicesDetailedAccordion({ content, eyebrow, subtitle }: ServicesDetailedAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-y">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="divide-y divide-border">
          {content.items.map((item, index) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    {LucideIcon && <LucideIcon className="size-5 text-primary" />}
                    <span className="font-medium text-foreground">{item.title}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5 pl-8">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                      {item.duration && (
                        <span className="text-muted-foreground">
                          Duration: <span className="text-foreground">{item.duration}</span>
                        </span>
                      )}
                      {item.price && (
                        <span className="font-semibold text-primary">{item.price}</span>
                      )}
                    </div>
                    {item.cta && (
                      <a
                        href={item.cta.url}
                        className="mt-4 inline-block rounded-[var(--radius-md)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                      >
                        {item.cta.text}
                      </a>
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
