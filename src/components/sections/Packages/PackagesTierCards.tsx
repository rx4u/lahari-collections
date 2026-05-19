"use client";

import { icons } from "lucide-react";

interface PackagesTierCardsProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    packages: Array<{
      name: string;
      price: string;
      period?: string;
      features: string[];
      deliveryTime?: string;
      highlighted?: boolean;
      cta: { text: string; url: string };
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function PackagesTierCards({ content, eyebrow, subtitle }: PackagesTierCardsProps) {
  const CheckIcon = icons["Check"];

  return (
    <section id="packages" className="section-y">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-[var(--radius-lg)] border p-6 ${
                pkg.highlighted
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card"
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-medium text-foreground">{pkg.name}</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                {pkg.period && (
                  <span className="text-sm text-muted-foreground"> / {pkg.period}</span>
                )}
              </div>
              {pkg.deliveryTime && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Delivery: {pkg.deliveryTime}
                </p>
              )}
              <ul className="mt-6 space-y-3">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    {CheckIcon && <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />}
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={pkg.cta.url}
                className={`mt-6 block rounded-[var(--radius-md)] px-4 py-2.5 text-center text-sm font-medium ${
                  pkg.highlighted
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {pkg.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
