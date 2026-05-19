"use client";

interface Area {
  name: string;
  description: string;
  propertyCount?: number;
  image?: string;
}

interface AreaGuideDetailedPageProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    areas: Area[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AreaGuideDetailedPage({ content, eyebrow, subtitle }: AreaGuideDetailedPageProps) {
  const { headline, description, areas } = content;

  return (
    <section className="section-y page-container">
      <div className="text-center mb-12">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-3">
          {headline}
        </h2>
        {description && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      <div className="space-y-[var(--spacing-md)]">
        {areas.map((area, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center${isEven ? "" : " md:flex-row-reverse"}`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden bg-muted shrink-0">
                {area.image ? (
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : null}
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-3">
                  {area.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 font-[family-name:var(--font-body)]">
                  {area.description}
                </p>
                {area.propertyCount !== undefined && (
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {area.propertyCount} {area.propertyCount === 1 ? "property" : "properties"} available
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
