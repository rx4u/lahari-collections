import { icons, Scale } from "lucide-react";

type PracticeAreasContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
    cta?: { text: string; url: string };
    subItems?: string[];
  }>;
};

export default function PracticeAreasDetailedCards({
  content,
  eyebrow,
  subtitle,
}: {
  content: PracticeAreasContent;
  eyebrow?: string;
  subtitle?: string;
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.items.map((item, index) => {
            const IconComponent = (icons as Record<string, React.ElementType>)[item.icon] || Scale;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-[var(--radius-lg)] p-8 flex flex-col"
              >
                <div className="flex items-start gap-4 mb-3">
                  <IconComponent
                    className="shrink-0 text-primary mt-0.5"
                    size={32}
                  />
                  <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-display)]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-3 font-[family-name:var(--font-body)]">
                  {item.description}
                </p>
                {item.subItems && item.subItems.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {item.subItems.map((sub, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground font-[family-name:var(--font-body)]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        />
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
                {item.cta && (
                  <div className="mt-auto pt-5">
                    <a
                      href={item.cta.url}
                      className="text-sm font-medium underline font-[family-name:var(--font-body)]"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.cta.text}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
