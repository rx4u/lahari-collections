"use client";

type MenuFoodContent = {
  headline: string;
  description?: string;
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

export default function MenuFoodCardGrid({ content, eyebrow, subtitle }: { content: MenuFoodContent; eyebrow?: string; subtitle?: string }) {
  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-foreground mb-3">
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-muted-foreground text-base max-w-xl mx-auto">{content.description}</p>
          )}
        </div>

        {content.categories.map((category) => (
          <div key={category.name} className="mb-12">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-foreground mb-6 pb-2 border-b border-border">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-card rounded-[var(--radius-md)] border border-border overflow-hidden flex flex-col"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-video object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="w-full aspect-video bg-muted" />
                  )}
                  <div className="p-4 flex flex-col flex-1 gap-1">
                    <div className="flex items-center gap-2">
                      {item.isVeg !== undefined && (
                        <span
                          className="inline-block w-3 h-3 rounded-[var(--radius-sm)] flex-shrink-0"
                          style={{ backgroundColor: item.isVeg ? "var(--color-success)" : "var(--color-danger)" }}
                          aria-label={item.isVeg ? "Vegetarian" : "Non-vegetarian"}
                        />
                      )}
                      <span className="font-semibold text-foreground text-sm leading-tight">
                        {item.name}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-muted-foreground text-sm leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <p className="text-primary font-semibold text-sm mt-auto pt-2">{item.price}</p>
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
