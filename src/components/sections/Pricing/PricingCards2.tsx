import { Check } from "lucide-react";

interface PricingCards2Props {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    plans: Array<{
      name: string;
      price: string;
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

export default function PricingCards2({ content, eyebrow, subtitle }: PricingCards2Props) {
  return (
    <section id="pricing" className="section-y">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card p-10 flex flex-col ${
                plan.highlighted
                  ? "border-t-4 border-t-primary shadow-lg"
                  : "border-border"
              }`}
            >
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                )}
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                )}
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.url}
                className={`block text-center py-3 px-6 rounded-[var(--radius-lg)] font-medium transition-colors ${
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
