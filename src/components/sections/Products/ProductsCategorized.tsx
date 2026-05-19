"use client";

interface ProductsCategorizedProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    categories: Array<{
      name: string;
      items: Array<{
        name: string;
        price: string;
        description: string;
    eyebrow?: string;
    subtitle?: string;
      image?: string;
      }>;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ProductsCategorized({ content, eyebrow, subtitle }: ProductsCategorizedProps) {
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
        <div className="space-y-12">
          {content.categories.map((cat, catIndex) => (
            <div key={catIndex}>
              <h3 className="mb-6 text-xl font-semibold text-foreground">{cat.name}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item, index) => (
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
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="mt-1 text-lg font-semibold text-primary">{item.price}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
