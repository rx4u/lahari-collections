interface MenuServicesPriceListProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    categories: Array<{
      name: string;
      items: Array<{
        name: string;
        duration?: string;
        price: string;
        description?: string;
    eyebrow?: string;
    subtitle?: string;
    }>;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function MenuServicesPriceList({ content, eyebrow, subtitle }: MenuServicesPriceListProps) {
  return (
    <section id="menu-services" className="section-y">
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

        <div className="mx-auto max-w-3xl space-y-10">
          {content.categories.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground border-b border-border pb-3 mb-4">
                {category.name}
              </h3>
              <div className="divide-y divide-border">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-foreground">
                        {item.name}
                      </span>
                      {item.description && (
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {item.duration && (
                        <span className="text-sm text-muted-foreground">
                          {item.duration}
                        </span>
                      )}
                      <span className="font-semibold text-foreground">
                        {item.price}
                      </span>
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
