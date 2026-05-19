"use client";

interface ProcessTimelineVerticalProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  steps: Array<{
      title: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
  }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ProcessTimelineVertical({ content, eyebrow, subtitle }: ProcessTimelineVerticalProps) {
  return (
    <section id="process" className="section-y">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="relative space-y-8">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-border" />
          {content.steps.map((step, index) => (
            <div key={index} className="relative flex gap-6 pl-2">
              <div className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </div>
              <div className="pt-1">
                <h3 className="font-medium text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
