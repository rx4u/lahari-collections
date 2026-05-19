import { Check, Minus } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: { text: string; url: string };
  highlighted?: boolean;
}

interface MembershipComparisonTableProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    plans: Plan[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function MembershipComparisonTable({ content, eyebrow, subtitle }: MembershipComparisonTableProps) {
  const { headline, description, plans } = content;

  const allFeatures = Array.from(
    new Set(plans.flatMap((p) => p.features))
  );

  return (
    <section className="section-y page-container">
      <div className="text-center mb-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-3">
          {headline}
        </h2>
        {description && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[var(--radius-md)] border border-border bg-card overflow-hidden${plan.highlighted ? " border-t-4 border-t-primary" : ""}`}
          >
            <div className={`p-5${plan.highlighted ? " bg-primary/5" : ""}`}>
              <div className="font-[family-name:var(--font-display)] font-bold text-xl text-foreground mb-1">
                {plan.name}
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-primary">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.period}</span>
              </div>
              <a
                href={plan.cta.url}
                className="block text-center bg-primary text-primary-foreground rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {plan.cta.text}
              </a>
            </div>
            <div className="px-5 pb-5 pt-3 space-y-2">
              {allFeatures.map((feature) => {
                const included = plan.features.includes(feature);
                return (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    {included ? (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <Minus className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={included ? "text-foreground" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: comparison table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 w-1/4 text-muted-foreground font-normal text-sm border-b border-border">
                Features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className={`p-4 text-center border-b border-border${plan.highlighted ? " bg-primary/5 border-t-4 border-t-primary" : ""}`}
                >
                  <div className="font-[family-name:var(--font-display)] font-bold text-lg text-foreground mb-1">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-2xl font-bold text-primary">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">/{plan.period}</span>
                  </div>
                  <a
                    href={plan.cta.url}
                    className="inline-block bg-primary text-primary-foreground rounded-[var(--radius-sm)] px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    {plan.cta.text}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, i) => (
              <tr key={feature} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                <td className="p-4 text-sm text-foreground">{feature}</td>
                {plans.map((plan) => {
                  const included = plan.features.includes(feature);
                  return (
                    <td
                      key={plan.name}
                      className={`p-4 text-center${plan.highlighted ? " bg-primary/5" : ""}`}
                    >
                      {included ? (
                        <Check className="w-4 h-4 text-primary mx-auto" />
                      ) : (
                        <Minus className="w-4 h-4 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
