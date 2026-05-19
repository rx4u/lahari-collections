'use client';

import { useState } from "react";
import { Check } from "lucide-react";

interface PricingToggleProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    plans: Array<{
      name: string;
      monthlyPrice: string;
      annualPrice: string;
      annualSavings?: string;
      period?: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
    features: string[];
      cta: { text: string; url: string };
      highlighted?: boolean;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function PricingToggle({ content, eyebrow, subtitle }: PricingToggleProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {content.description}
            </p>
          )}
          <div className="inline-flex items-center rounded-full border border-border p-1 bg-muted/40">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                !annual
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                annual
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card p-8 flex flex-col ${
                plan.highlighted ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {annual && plan.highlighted && plan.annualSavings && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.annualSavings}
                </span>
              )}
              <div className="mb-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground mb-1">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                )}
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground ml-1 text-sm">/{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.url}
                className={`block text-center py-2.5 px-6 rounded-[var(--radius-lg)] font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {plan.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
