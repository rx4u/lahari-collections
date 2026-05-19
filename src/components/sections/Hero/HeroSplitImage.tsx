"use client";

interface HeroSplitImageProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  image?: string;
}

export default function HeroSplitImage({
  headline,
  subheadline,
  cta,
  secondaryCta,
  image,
}: HeroSplitImageProps) {
  return (
    <section id="hero" className="relative">
      <div className="page-container py-16 sm:py-20 lg:py-24">
        <div
          className={`grid ${image ? "md:grid-cols-2" : ""} gap-8 md:gap-12 items-center`}
        >
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={cta.url}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block"
              >
                {cta.text}
              </a>
              {secondaryCta && (
                <a
                  href={secondaryCta.url}
                  className="border border-border text-foreground hover:bg-accent rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block"
                >
                  {secondaryCta.text}
                </a>
              )}
            </div>
          </div>
          {image && (
            <div>
              <img
                src={image}
                alt={headline}
                className="w-full h-auto rounded-[var(--radius-lg)] object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
