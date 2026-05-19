import { Check, Minus } from "lucide-react";

interface PricingTableProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    plans: Array<{
      name: string;
      price: string;
      period?: string;
      highlighted?: boolean;
      cta: { text: string; url: string };
    }>;
    features: Array<{
      name: string;
      values: Array<boolean | string>;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function PricingTable({ content, eyebrow, subtitle }: PricingTableProps) {
  return (
    <section id="pricing" className="section-y">
      <div className="page-container">
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
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="sticky left-0 bg-card px-6 py-5 text-left font-medium text-muted-foreground w-48 min-w-[180px]">
                  Features
                </th>
                {content.plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={`px-6 py-5 text-center min-w-[160px] ${
                      plan.highlighted ? "bg-primary/5" : "bg-card"
                    }`}
                  >
                    <div className="font-[family-name:var(--font-display)] font-semibold text-foreground text-base">
                      {plan.name}
                    </div>
                    <div className="text-2xl font-bold text-foreground mt-1">{plan.price}</div>
                    {plan.period && (
                      <div className="text-xs text-muted-foreground">/{plan.period}</div>
                    )}
                    <a
                      href={plan.cta.url}
                      className={`inline-block mt-3 px-4 py-1.5 rounded-[var(--radius-lg)] text-xs font-medium transition-colors ${
                        plan.highlighted
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "border border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {plan.cta.text}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.features.map((feature, i) => (
                <tr
                  key={feature.name}
                  className={`border-b border-border last:border-0 ${
                    i % 2 === 0 ? "bg-muted/30" : ""
                  }`}
                >
                  <td className="sticky left-0 bg-inherit px-6 py-4 text-foreground font-medium">
                    {feature.name}
                  </td>
                  {feature.values.map((val, j) => (
                    <td
                      key={j}
                      className={`px-6 py-4 text-center ${
                        content.plans[j]?.highlighted ? "bg-primary/5" : ""
                      }`}
                    >
                      {typeof val === "boolean" ? (
                        val ? (
                          <Check className="h-4 w-4 text-primary mx-auto" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-foreground">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
