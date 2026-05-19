"use client";

interface TestimonialsFeaturedQuoteProps {
  content: {
    headline: string;
    eyebrow?: string;
    subtitle?: string;
    featured: {
      quote: string;
      name: string;
      role: string;
      rating?: number;
    };
    items?: Array<{
      quote: string;
      name: string;
      role: string;
      rating?: number;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-primary" : "text-muted-foreground/30"}>
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsFeaturedQuote({ content, eyebrow, subtitle }: TestimonialsFeaturedQuoteProps) {
  return (
    <section id="testimonials" className="section-y">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {content.headline && (
          <h2 className="mb-12 font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
        )}
        <div className="mb-12 rounded-[var(--radius-lg)] border border-border bg-card p-8 md:p-12">
          <span className="text-5xl leading-none text-primary">&ldquo;</span>
          <blockquote className="mt-2 font-[family-name:var(--font-display)] text-xl md:text-2xl text-foreground">
            {content.featured.quote}
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div>
              <p className="font-medium text-foreground">{content.featured.name}</p>
              <p className="text-sm text-muted-foreground">{content.featured.role}</p>
            </div>
          </div>
          {content.featured.rating && (
            <div className="mt-3">
              <StarRating rating={content.featured.rating} />
            </div>
          )}
        </div>
        {content.items && content.items.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, index) => (
              <div key={index} className="rounded-[var(--radius-lg)] border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
                {item.rating && (
                  <div className="mt-2">
                    <StarRating rating={item.rating} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
