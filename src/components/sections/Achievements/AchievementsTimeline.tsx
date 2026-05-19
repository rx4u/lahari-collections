import { Trophy } from "lucide-react";

interface AchievementsTimelineProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      title: string;
      year?: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
    icon?: string;
      category?: string;
      badge?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AchievementsTimeline({ content, eyebrow, subtitle }: AchievementsTimelineProps) {
  return (
    <section className="section-y">
      <div className="page-container">
        {(content.headline || content.description) && (
          <div className="text-center mb-12">
            {content.headline && (
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">
                {content.headline}
              </h2>
            )}
            {content.description && (
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">{content.description}</p>
            )}
          </div>
        )}

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block overflow-x-auto pb-4">
          <div className="flex items-start min-w-max gap-0">
            {content.items.map((item, i) => (
              <div key={i} className="flex items-start">
                <div className="flex flex-col items-center w-40">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                    <Trophy size={14} />
                  </div>
                  <div className="text-center mt-3 px-2">
                    {item.year && (
                      <p className="text-primary font-bold text-sm">{item.year}</p>
                    )}
                    <p className="font-semibold text-sm text-foreground mt-0.5">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
                {i < content.items.length - 1 && (
                  <div className="h-px w-12 bg-border mt-4 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden border-l-2 border-primary/30 pl-6 space-y-6">
          {content.items.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[1.875rem] top-0 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                <Trophy size={14} />
              </div>
              {item.year && (
                <p className="text-primary font-bold text-sm">{item.year}</p>
              )}
              <p className="font-semibold text-sm text-foreground mt-0.5">{item.title}</p>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
