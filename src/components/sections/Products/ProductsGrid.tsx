"use client";

interface ProductsGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    items: Array<{
      name: string;
      price: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    image?: string;
      cta?: { text: string; url: string };
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ProductsGrid({ content, eyebrow, subtitle }: ProductsGridProps) {
  return (
    <section id="products" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-square w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              )}
              <div className="p-5">
                <h3 className="font-medium text-foreground">{item.name}</h3>
                <p className="mt-1 text-lg font-semibold text-primary">{item.price}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                {item.cta && (
                  <a
                    href={item.cta.url}
                    className="mt-4 inline-block rounded-[var(--radius-md)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                  >
                    {item.cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
