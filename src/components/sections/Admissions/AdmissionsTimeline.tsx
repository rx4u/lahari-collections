import { Check } from "lucide-react";

interface AdmissionsTimelineProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  steps?: Array<{
      step: number;
      title: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    deadline?: string;
    }>;
    requirements?: string[];
    importantDates?: Array<{ label: string; date: string }>;
    contactEmail?: string;
    contactPhone?: string;
    cta?: { text: string; url: string };
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AdmissionsTimeline({ content, eyebrow, subtitle }: AdmissionsTimelineProps) {
  const { headline, description, steps, requirements, cta } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {steps && steps.length > 0 ? (
          <div className="max-w-2xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 mb-10 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                    {s.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 w-px border-l-2 border-primary/30 mt-2" />
                  )}
                </div>
                <div className="pb-10 last:pb-0 flex-1">
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground text-lg">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {s.description}
                  </p>
                  {s.deadline && (
                    <span
                      className="inline-block mt-2 text-xs px-2 py-0.5 rounded border"
                      style={{ background: "rgb(255 251 235)", color: "rgb(180 83 9)", borderColor: "rgb(253 230 138)" }}
                    >
                      Deadline: {s.deadline}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : requirements && requirements.length > 0 ? (
          <ul className="max-w-xl mx-auto space-y-3">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{req}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {cta && (
          <div className="text-center mt-10">
            <a
              href={cta.url}
              className="inline-block bg-[var(--color-primary)] text-[var(--color-on-primary)] font-medium px-8 py-3 rounded-[var(--radius-sm)] text-sm hover:opacity-90 transition-opacity"
            >
              {cta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
