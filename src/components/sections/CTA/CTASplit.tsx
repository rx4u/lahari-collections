"use client";

interface CTASplitProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    cta: { text: string; url: string };
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function CTASplit({ content, eyebrow, subtitle }: CTASplitProps) {
  return (
    <section id="cta" className="section-y">
      <div className="page-container">
        <div className="flex flex-col items-center justify-between gap-8 rounded-[var(--radius-lg)] bg-primary px-8 py-10 md:flex-row md:px-12">
          <div className="max-w-lg">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-foreground md:text-3xl">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mt-3 text-primary-foreground/80">{content.description}</p>
            )}
          </div>
          <a
            href={content.cta.url}
            className="shrink-0 rounded-[var(--radius-md)] bg-card px-6 py-3 text-sm font-medium text-foreground"
          >
            {content.cta.text}
          </a>
        </div>
      </div>
    </section>
  );
}
