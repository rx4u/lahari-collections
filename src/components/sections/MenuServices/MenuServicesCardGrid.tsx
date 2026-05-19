type MenuServicesContent = {
  headline: string;
  description?: string;
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

export default function MenuServicesCardGrid({ content, eyebrow, subtitle }: { content: MenuServicesContent; eyebrow?: string; subtitle?: string }) {
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
                  className="bg-card rounded-[var(--radius-md)] border border-border p-5 flex flex-col gap-2"
                >
                  <span className="font-semibold text-foreground">{item.name}</span>
                  {item.description && (
                    <p className="text-muted-foreground text-sm leading-snug flex-1">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    {item.duration ? (
                      <span className="bg-muted rounded px-2 py-1 text-xs text-muted-foreground">
                        {item.duration}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="text-primary font-bold">{item.price}</span>
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
