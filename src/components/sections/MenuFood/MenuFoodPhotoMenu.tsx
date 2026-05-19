"use client";

interface MenuFoodPhotoMenuProps {
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

export default function MenuFoodPhotoMenu({ content, eyebrow, subtitle }: MenuFoodPhotoMenuProps) {
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

        {content.categories.map((category, catIndex) => (
          <div key={catIndex} className={catIndex > 0 ? "mt-10" : ""}>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-6">
              {category.name}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-48 w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.isVeg !== undefined && (
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: item.isVeg ? "var(--color-success)" : "var(--color-danger)" }}
                          />
                        )}
                        <h4 className="font-medium text-foreground">
                          {item.name}
                        </h4>
                      </div>
                      <span className="shrink-0 font-semibold text-primary">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
