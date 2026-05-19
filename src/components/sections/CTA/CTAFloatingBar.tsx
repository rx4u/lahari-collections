"use client";

interface CTAFloatingBarProps {
  content: {
    headline: string;
    eyebrow?: string;
    subtitle?: string;
    cta: { text: string; url: string };
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function CTAFloatingBar({ content, eyebrow, subtitle }: CTAFloatingBarProps) {
  return (
    <section id="cta" className="section-y">
      <div className="page-container">
        <div className="flex flex-col items-center justify-between gap-4 rounded-full border border-border bg-card px-6 py-4 shadow-sm sm:flex-row sm:px-8">
          <p className="font-medium text-foreground">{content.headline}</p>
          <a
            href={content.cta.url}
            className="shrink-0 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
          >
            {content.cta.text}
          </a>
        </div>
      </div>
    </section>
  );
}
