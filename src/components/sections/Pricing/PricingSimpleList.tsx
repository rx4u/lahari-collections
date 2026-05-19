interface PricingSimpleListProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  currency?: string;
    items: Array<{
      name: string;
      price: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
    category?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function PricingSimpleList({ content, eyebrow, subtitle }: PricingSimpleListProps) {
  const currency = content.currency ?? "₹";

  const grouped: Record<string, typeof content.items> = {};
  const ungrouped: typeof content.items = [];

  for (const item of content.items) {
    if (item.category) {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    } else {
      ungrouped.push(item);
    }
  }

  const hasCategories = Object.keys(grouped).length > 0;

  const renderItem = (item: (typeof content.items)[0]) => (
    <div key={item.name} className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
      <div>
        <span className="text-foreground font-medium">{item.name}</span>
        {item.description && (
          <p className="text-muted-foreground text-sm mt-0.5">{item.description}</p>
        )}
      </div>
      <span className="text-foreground font-semibold whitespace-nowrap shrink-0">
        {currency}{item.price}
      </span>
    </div>
  );

  return (
    <section id="pricing" className="section-y">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-muted-foreground text-lg">{content.description}</p>
          )}
        </div>
        <div className="bg-card rounded-2xl border border-border px-6 py-2">
          {hasCategories ? (
            <>
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border">
                    {category}
                  </div>
                  {items.map(renderItem)}
                </div>
              ))}
              {ungrouped.map(renderItem)}
            </>
          ) : (
            ungrouped.map(renderItem)
          )}
        </div>
      </div>
    </section>
  );
}
