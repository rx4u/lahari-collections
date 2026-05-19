type TimelineItem = {
  year: string;
  title: string;
  description: string;
  milestone?: string;
};

type ImpactTimelineContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  timeline?: TimelineItem[];
};

export default function ImpactTimeline({
  content,
  eyebrow,
  subtitle,
}: {
  content: ImpactTimelineContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, timeline = [] } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              {description}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l-2 border-primary/20" />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content side */}
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <h3 className="text-lg font-semibold text-foreground mb-1 font-[family-name:var(--font-display)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2 font-[family-name:var(--font-body)]">
                      {item.description}
                    </p>
                    {item.milestone && (
                      <span className="inline-block bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 font-[family-name:var(--font-body)]">
                        {item.milestone}
                      </span>
                    )}
                  </div>

                  {/* Year circle */}
                  <div className="flex-shrink-0 flex items-start md:items-center justify-start md:justify-center w-auto md:w-0 relative">
                    <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-bold z-10 font-[family-name:var(--font-body)]">
                      {item.year}
                    </span>
                  </div>

                  {/* Empty spacer on the other side */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
