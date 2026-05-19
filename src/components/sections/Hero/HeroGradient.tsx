interface HeroGradientProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
}

export default function HeroGradient({
  headline,
  subheadline,
  cta,
  secondaryCta,
}: HeroGradientProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))",
      }}
    >
      <div className="page-container text-center">
        <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--color-on-primary)]">
          {headline}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[var(--color-on-primary)]/80 max-w-2xl mx-auto">
          {subheadline}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href={cta.url}
            className="bg-card text-foreground hover:bg-card/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block"
          >
            {cta.text}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.url}
              className="border border-[var(--color-on-primary)]/30 text-[var(--color-on-primary)] hover:bg-[var(--color-on-primary)]/10 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block"
            >
              {secondaryCta.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
