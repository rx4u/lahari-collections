"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type Package = {
  name: string;
  price?: string;
  duration?: string;
  description?: string;
  features?: string[];
  cta?: { text: string; url: string };
  highlighted?: boolean;
};

type Props = {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    packages: Package[];
  };
  eyebrow?: string;
  subtitle?: string;
};

export default function PackagesDetailedAccordion({ content, eyebrow, subtitle }: Props) {
  const { headline, description, packages = [] } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {packages.map((pkg, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-border rounded-[var(--radius-md)] overflow-hidden"
                style={pkg.highlighted ? { backgroundColor: "color-mix(in srgb, var(--color-primary) 5%, transparent)" } : {}}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-[family-name:var(--font-display)] font-semibold text-foreground text-base">
                    {pkg.name}
                  </span>
                  <div className="flex items-center gap-3">
                    {pkg.price && (
                      <span className="font-bold text-base" style={{ color: "var(--color-primary)" }}>
                        {pkg.price}
                      </span>
                    )}
                    <ChevronDown
                      size={18}
                      className="text-muted-foreground transition-transform"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                    {pkg.description && (
                      <p className="text-muted-foreground text-sm">{pkg.description}</p>
                    )}
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="space-y-2">
                        {pkg.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-sm text-foreground">
                            <Check size={15} className="mt-0.5 shrink-0" style={{ color: "var(--color-primary)" }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center gap-4 flex-wrap">
                      {pkg.duration && (
                        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {pkg.duration}
                        </span>
                      )}
                      {pkg.cta && (
                        <a
                          href={pkg.cta.url}
                          className="text-sm font-medium px-4 py-2 rounded-[var(--radius-sm)]"
                          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                        >
                          {pkg.cta.text}
                        </a>
                      )}
                    </div>
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
