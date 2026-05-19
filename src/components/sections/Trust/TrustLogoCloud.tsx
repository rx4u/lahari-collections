"use client";

interface TrustLogoCloudProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    logos: Array<{
      src: string;
      alt: string;
      url?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function TrustLogoCloud({ content, eyebrow, subtitle }: TrustLogoCloudProps) {
  return (
    <section id="trust" className="section-y">
      <div className="page-container">
        {content.headline && (
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center">
            {content.headline}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {content.logos.map((logo, i) => {
            const img = (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-8 md:h-10 object-contain opacity-60 hover:opacity-100 transition-opacity"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
            );
            return logo.url ? (
              <a key={i} href={logo.url} target="_blank" rel="noopener noreferrer">
                {img}
              </a>
            ) : (
              img
            );
          })}
        </div>
      </div>
    </section>
  );
}
