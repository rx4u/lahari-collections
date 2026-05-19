"use client";

interface CollectionsLookbookProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    collections: Array<{
      name: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
    image?: string;
      itemCount?: number;
      cta?: { text: string; url: string };
      featured?: boolean;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function CollectionsLookbook({ content, eyebrow, subtitle }: CollectionsLookbookProps) {
  const { headline, description, collections } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-[var(--spacing-lg)]">
          {collections.map((col, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${
                  !imageLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-[60%] shrink-0">
                  {col.image ? (
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full aspect-[3/4] object-cover rounded-[var(--radius-lg)]"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-muted rounded-[var(--radius-lg)]" />
                  )}
                </div>

                <div className="w-full md:w-[40%] flex flex-col justify-center gap-4">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
                    {col.name}
                  </h3>
                  {col.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {col.description}
                    </p>
                  )}
                  {col.itemCount !== undefined && (
                    <p className="text-sm text-muted-foreground">
                      {col.itemCount} pieces
                    </p>
                  )}
                  {col.cta && (
                    <a
                      href={col.cta.url}
                      className="inline-block w-fit bg-[var(--color-primary)] text-[var(--color-on-primary)] font-medium px-6 py-2.5 rounded-[var(--radius-sm)] text-sm transition-opacity hover:opacity-90"
                    >
                      {col.cta.text}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
