type Step = {
  step?: number;
  title: string;
  description: string;
  icon?: string;
};

type Props = {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    steps: Step[];
  };
  eyebrow?: string;
  subtitle?: string;
};

import { ChevronRight } from "lucide-react";

export default function ProcessStepsHorizontal({ content, eyebrow, subtitle }: Props) {
  const { headline, description, steps = [] } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-3">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 flex-1 min-w-0">
              <div className="flex flex-col md:flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold font-[family-name:var(--font-display)] text-lg shrink-0"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  {step.step ?? i + 1}
                </div>
                <div className="mt-3 text-center px-2 md:px-4 max-w-[140px]">
                  <p className="font-semibold text-foreground text-sm leading-tight">{step.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{step.description}</p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <ChevronRight
                  size={20}
                  className="text-muted-foreground shrink-0 hidden md:block mt-[-44px]"
                />
              )}
              {i < steps.length - 1 && (
                <div className="w-px h-6 bg-border md:hidden mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
