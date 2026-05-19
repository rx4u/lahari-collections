"use client";

interface PortfolioMasonryProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      title: string;
      category: string;
      image: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
  }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function PortfolioMasonry({ content, eyebrow, subtitle }: PortfolioMasonryProps) {
  return (
    <section id="portfolio" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {content.items.map((item, index) => (
            <div
              key={index}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[var(--radius-lg)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: gradient scrim on portfolio image */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: category on darkened portfolio image */}
                <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                  {item.category}
                </p>
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: title on darkened portfolio image */}
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                {item.description && (
                  // eslint-disable-next-line no-restricted-syntax -- photo overlay: description on darkened portfolio image
                  <p className="mt-1 text-sm text-white/80">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
