import { Check } from "lucide-react";

interface MembershipTierCardsProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      features: string[];
      cta: { text: string; url: string };
      highlighted?: boolean;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function MembershipTierCards({ content, eyebrow, subtitle }: MembershipTierCardsProps) {
  return (
    <section id="membership" className="section-y">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-[var(--radius-lg)] border bg-card p-8 ${
                plan.highlighted
                  ? "border-primary ring-2 ring-primary/20 relative"
                  : "border-border"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Best Value
                </span>
              )}
              <p className="text-lg font-semibold text-foreground">{plan.name}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground"> / {plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="text-primary mt-0.5 shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.url}
                className={`mt-8 block w-full text-center rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-accent"
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
