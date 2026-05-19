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

export default function MenuFoodMinimalList({ content, eyebrow, subtitle }: { content: MenuFoodContent; eyebrow?: string; subtitle?: string }) {
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
          <div key={category.name} className="mb-10">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-foreground mb-4 pb-2 border-b border-border uppercase tracking-wide">
              {category.name}
            </h3>
            <div className="flex flex-col gap-0">
              {category.items.map((item) => (
                <div key={item.name} className="pb-2 mb-2 border-b border-dashed border-border last:border-none">
                  <div className="flex items-baseline gap-2">
                    {item.isVeg !== undefined && (
                      <span
                        className="inline-block w-[10px] h-[10px] rounded-[2px] flex-shrink-0 relative top-[1px]"
                        style={{ backgroundColor: item.isVeg ? "var(--color-success)" : "var(--color-danger)" }}
                        aria-label={item.isVeg ? "Vegetarian" : "Non-vegetarian"}
                      />
                    )}
                    <span className="flex-1 font-medium text-foreground text-sm md:text-base">
                      {item.name}
                    </span>
                    <span className="text-primary font-semibold text-sm md:text-base whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-muted-foreground text-xs mt-0.5 pl-5">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
