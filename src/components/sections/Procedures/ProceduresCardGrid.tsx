import { Stethoscope } from "lucide-react";

type ProceduresContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  items: Array<{
    name: string;
    description: string;
    duration?: string;
    cost?: string;
  }>;
};

export default function ProceduresCardGrid({
  content,
  eyebrow,
  subtitle,
}: {
  content: ProceduresContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, items } = content;

  return (
    <section className="section-y page-container">
      <div className="text-center mb-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-foreground mb-3">
          {headline}
        </h2>
        {description && (
          <p className="font-[family-name:var(--font-body)] text-muted-foreground text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.name}
            className="bg-card border border-border rounded-[var(--radius-md)] p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <Stethoscope
                size={18}
                className="text-primary shrink-0"
              />
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground text-base leading-snug">
                {item.name}
              </h3>
            </div>

            <p className="font-[family-name:var(--font-body)] text-sm text-muted-foreground leading-relaxed flex-1">
              {item.description}
            </p>

            {(item.duration || item.cost) && (
              <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                {item.duration && (
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-[family-name:var(--font-body)]">
                    {item.duration}
                  </span>
                )}
                {item.cost && (
                  <span className="font-[family-name:var(--font-body)] text-primary font-bold text-sm ml-auto">
                    {item.cost}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
