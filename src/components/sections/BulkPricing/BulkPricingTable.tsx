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

export default function BulkPricingTable({ content, eyebrow, subtitle }: { content: BulkPricingContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description, note, tiers } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground font-[family-name:var(--font-body)]">{description}</p>
          )}
        </div>

        <div className="overflow-x-auto rounded-[var(--radius-md)] border border-border">
          <table className="w-full text-sm font-[family-name:var(--font-body)]">
            <thead>
              <tr className="bg-muted text-muted-foreground text-sm">
                <th className="text-left px-4 py-3 font-medium">Tier / Name</th>
                <th className="text-left px-4 py-3 font-medium">Quantity</th>
                <th className="text-left px-4 py-3 font-medium">Price / Unit</th>
                <th className="text-left px-4 py-3 font-medium">Total Price</th>
                <th className="text-left px-4 py-3 font-medium">Savings</th>
                <th className="text-left px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, i) => (
                <tr
                  key={i}
                  className={`border-b border-border ${tier.highlighted ? "bg-primary/5 font-semibold" : ""}`}
                >
                  <td className="px-4 py-3 text-foreground">{tier.name}</td>
                  <td className="px-4 py-3 text-foreground">{tier.quantity}</td>
                  <td className="px-4 py-3 text-foreground">{tier.pricePerUnit}</td>
                  <td className="px-4 py-3 text-foreground">{tier.totalPrice ?? "—"}</td>
                  <td className="px-4 py-3">
                    {tier.savings ? (
                      <span style={{ color: "rgb(22 163 74)" }} className="font-semibold">
                        {tier.savings}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-primary text-sm font-medium hover:underline">
                      Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {note && (
          <p className="mt-4 text-sm text-muted-foreground italic font-[family-name:var(--font-body)]">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
