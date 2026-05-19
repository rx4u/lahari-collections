interface HeroMinimalProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
}

export default function HeroMinimal({ headline, subheadline, cta }: HeroMinimalProps) {
  return (
    <section id="hero" className="flex items-center min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          {headline}
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {subheadline}
        </p>
        <a
          href={cta.url}
          className="mt-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block"
        >
          {cta.text}
        </a>
      </div>
    </section>
  );
}
