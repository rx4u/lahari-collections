type BulkPricingContent = {
  headline: string;
  description?: string;
  note?: string;
  tiers: Array<{
    name: string;
    quantity: string;
    pricePerUnit: string;
    totalPrice?: string;
    savings?: string;
    highlighted?: boolean;
  }>;
};

export default function BulkPricingTierCards({ content, eyebrow, subtitle }: { content: BulkPricingContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description, note, tiers } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground font-[family-name:var(--font-body)] max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-[family-name:var(--font-body)]">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`bg-card border rounded-[var(--radius-md)] p-6 text-center flex flex-col gap-2 ${
                tier.highlighted
                  ? "ring-2 ring-primary border-primary"
                  : "border-border"
              }`}
            >
              <div className="font-[family-name:var(--font-display)] text-xl font-bold text-primary">
                {tier.quantity}
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">{tier.pricePerUnit}</div>
              <div className="text-sm text-muted-foreground">{tier.name}</div>
              {tier.totalPrice && (
                <div className="text-sm text-muted-foreground">Total: {tier.totalPrice}</div>
              )}
              {tier.savings && (
                <span
                  className="inline-block text-xs px-2 py-0.5 rounded self-center"
                  style={{ backgroundColor: "rgb(240 253 244)", color: "rgb(21 128 61)" }}
                >
                  Save {tier.savings}
                </span>
              )}
            </div>
          ))}
        </div>

        {note && (
          <p className="mt-6 text-sm text-muted-foreground italic text-center font-[family-name:var(--font-body)]">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
