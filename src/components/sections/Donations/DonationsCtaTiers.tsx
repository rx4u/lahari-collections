"use client";

interface DonationsCtaTiersProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  tiers: Array<{
      name: string;
      amount: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    impact: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function DonationsCtaTiers({ content, eyebrow, subtitle }: DonationsCtaTiersProps) {
  return (
    <section id="donations" className="section-y">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.tiers.map((tier, index) => (
            <div key={index} className="rounded-[var(--radius-lg)] border border-border bg-card p-6 text-center">
              <h3 className="text-lg font-medium text-foreground">{tier.name}</h3>
              <p className="mt-2 text-3xl font-bold text-primary">{tier.amount}</p>
              <p className="mt-3 text-sm text-muted-foreground">{tier.description}</p>
              <div className="mt-4 rounded-[var(--radius-md)] bg-primary/5 px-3 py-2">
                <p className="text-xs font-medium text-primary">{tier.impact}</p>
              </div>
              <button className="mt-6 w-full rounded-[var(--radius-md)] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                Donate {tier.amount}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
