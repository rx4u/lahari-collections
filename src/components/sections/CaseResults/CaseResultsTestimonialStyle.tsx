import { Quote } from "lucide-react";

type CaseResultsContent = {
  headline: string;
  description?: string;
  stats: Array<{
    value: string;
    label: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  }>;
  cases?: Array<{
    title: string;
    outcome: string;
    quote?: string;
    clientType?: string;
  }>;
};

export default function CaseResultsTestimonialStyle({
  content,
}: {
  content: CaseResultsContent;
}) {
  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-10">
          <h2
            className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-[family-name:var(--font-display)]"
          >
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-muted-foreground font-[family-name:var(--font-body)]">
              {content.description}
            </p>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-[var(--radius-md)] p-6 text-center"
            >
              <div
                className="text-3xl md:text-4xl font-semibold mb-1 font-[family-name:var(--font-display)]"
                style={{ color: "var(--color-primary)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1 font-[family-name:var(--font-body)]">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Case cards */}
        {content.cases && content.cases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.cases.map((c, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-[var(--radius-md)] p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-foreground font-[family-name:var(--font-display)]">
                    {c.title}
                  </h3>
                  {c.clientType && (
                    <span
                      className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-[var(--radius-sm)] border font-[family-name:var(--font-body)]"
                      style={{
                        borderColor: "var(--color-primary)",
                        color: "var(--color-primary)",
                        backgroundColor: "transparent",
                      }}
                    >
                      {c.clientType}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                  {c.outcome}
                </p>
                {c.quote && (
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Quote
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--color-primary)" }}
                    />
                    <p className="text-sm text-muted-foreground italic font-[family-name:var(--font-body)]">
                      {c.quote}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
