"use client";

interface AboutTimelineProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  milestones: Array<{
      year: string;
      title: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
  }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AboutTimeline({ content, eyebrow, subtitle }: AboutTimelineProps) {
  return (
    <section id="about" className="section-y">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block" />
          <div className="space-y-8 md:space-y-12">
            {content.milestones.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row md:items-start">
                  <div className="absolute left-4 top-1 z-10 hidden size-3 -translate-x-1/2 rounded-full bg-primary md:left-1/2 md:block" />
                  <div
                    className={`pl-10 md:w-1/2 md:pl-0 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <span className="text-sm font-semibold text-primary">{item.year}</span>
                    <h3 className="mt-1 text-lg font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
