import { MapPin } from "lucide-react";

type Area = {
  name: string;
  distance?: string;
  available?: boolean;
  note?: string;
};

type ServiceAreasListWithBadgesContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  areas: Area[];
  cta?: { text: string; url: string };
};

export default function ServiceAreasListWithBadges({
  content,
  eyebrow,
  subtitle,
}: {
  content: ServiceAreasListWithBadgesContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, areas = [], cta } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground font-[family-name:var(--font-body)]">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {areas.map((area, i) => (
            <div
              key={i}
              className="border border-border rounded-full px-4 py-2 flex items-center gap-2 bg-card"
              title={area.note}
            >
              <MapPin size={14} className="text-primary shrink-0" />
              <span className="font-medium text-sm text-foreground font-[family-name:var(--font-body)]">
                {area.name}
              </span>
              {area.distance && (
                <span className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                  {area.distance}
                </span>
              )}
              {area.available !== undefined && (
                <span
                  className="w-2 h-2 rounded-full ml-auto shrink-0"
                  style={{
                    backgroundColor: area.available
                      ? "rgb(22 163 74)"
                      : "var(--color-neutral)",
                    opacity: area.available ? 1 : 0.4,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {cta && (
          <div className="text-center">
            <a
              href={cta.url}
              className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-[var(--radius-sm)] text-sm hover:opacity-90 transition-opacity font-[family-name:var(--font-body)]"
            >
              {cta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
