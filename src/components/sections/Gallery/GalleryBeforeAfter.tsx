"use client";

interface GalleryBeforeAfterProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  pairs: Array<{
      title?: string;
      before: string;
      after: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function GalleryBeforeAfter({ content, eyebrow, subtitle }: GalleryBeforeAfterProps) {
  return (
    <section id="gallery" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {content.pairs.map((pair, index) => (
            <div key={index}>
              {pair.title && (
                <h3 className="mb-3 font-medium text-foreground">{pair.title}</h3>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="overflow-hidden rounded-[var(--radius-lg)]">
                    <img
                      src={pair.before}
                      alt="Before"
                      className="aspect-square w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Before
                  </p>
                </div>
                <div>
                  <div className="overflow-hidden rounded-[var(--radius-lg)]">
                    <img
                      src={pair.after}
                      alt="After"
                      className="aspect-square w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    After
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
