"use client";

interface MenuFoodCategorizedProps {
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
        description?: string;
    eyebrow?: string;
    subtitle?: string;
      image?: string;
        isVeg?: boolean;
      }>;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function MenuFoodCategorized({ content, eyebrow, subtitle }: MenuFoodCategorizedProps) {
  return (
    <section id="menu-food" className="section-y">
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

        <div className="space-y-10">
          {content.categories.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground border-b border-border pb-3 mb-4">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-14 rounded-[var(--radius-md)] object-cover shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                        />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {item.isVeg !== undefined && (
                            <span
                              className="size-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: item.isVeg ? "var(--color-success)" : "var(--color-danger)" }}
                            />
                          )}
                          <span className="font-medium text-foreground">
                            {item.name}
                          </span>
                        </div>
                        {item.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 font-medium text-foreground">
                      {item.price}
                    </span>
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
