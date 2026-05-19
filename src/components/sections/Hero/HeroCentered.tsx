interface HeroCenteredProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
}

export default function HeroCentered({
  headline,
  subheadline,
  cta,
  secondaryCta,
}: HeroCenteredProps) {
  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center">
      <div className="page-container text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
          {headline}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          {subheadline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href={cta.url}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors"
          >
            {cta.text}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.url}
              className="border border-border text-foreground hover:bg-accent rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors"
            >
              {secondaryCta.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
