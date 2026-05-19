import * as LucideIcons from "lucide-react";
import { Circle } from "lucide-react";

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

function DynamicIcon({ name, size }: { name?: string; size: number }) {
  if (!name) return <Circle size={size} />;
  const key = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size: number }>>)[key];
  return Icon ? <Icon size={size} /> : <Circle size={size} />;
}

export default function ProcessIconFlow({ content, eyebrow, subtitle }: Props) {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              <div className="relative mb-4">
                <div style={{ color: "var(--color-primary)" }}>
                  <DynamicIcon name={step.icon} size={48} />
                </div>
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold leading-none"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  {step.step ?? i + 1}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground text-base mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+32px)] right-[-50%] border-b-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
