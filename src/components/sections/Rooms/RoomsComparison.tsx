import { Check, Minus } from "lucide-react";

interface RoomsComparisonProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    rooms: Array<{
      name: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    price: string;
      period?: string;
      amenities?: string[];
      image?: string;
      cta?: { text: string; url: string };
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function RoomsComparison({ content, eyebrow, subtitle }: RoomsComparisonProps) {
  const allAmenities = Array.from(
    new Set(content.rooms.flatMap((r) => r.amenities ?? []))
  );

  return (
    <section id="rooms" className="section-y">
      <div className="page-container">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-3 font-[family-name:var(--font-body)] text-muted-foreground">
              {content.description}
            </p>
          )}
        </div>

        <div className={content.rooms.length > 3 ? "overflow-x-auto" : ""}>
          <div
            className="grid min-w-[600px]"
            style={{ gridTemplateColumns: `180px repeat(${content.rooms.length}, 1fr)` }}
          >
            {/* Header row */}
            <div className="border-b border-border pb-4" />
            {content.rooms.map((room, i) => (
              <div
                key={i}
                className="border-b border-border pb-4 px-4 border-l border-l-border"
              >
                <p className="font-[family-name:var(--font-display)] font-semibold text-foreground">
                  {room.name}
                </p>
                <p className="mt-1 font-bold text-primary text-lg leading-tight">
                  {room.price}
                  {room.period && (
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                      / {room.period}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {room.description}
                </p>
              </div>
            ))}

            {/* Amenity rows */}
            {allAmenities.map((amenity, ai) => (
              <>
                <div
                  key={`label-${ai}`}
                  className="py-3 pr-4 text-sm text-muted-foreground border-b border-border"
                >
                  {amenity}
                </div>
                {content.rooms.map((room, ri) => {
                  const has = room.amenities?.includes(amenity) ?? false;
                  return (
                    <div
                      key={`${ai}-${ri}`}
                      className="py-3 px-4 border-b border-border border-l border-l-border flex items-center"
                    >
                      {has ? (
                        <Check size={16} className="text-primary" />
                      ) : (
                        <Minus size={16} className="text-muted-foreground/40" />
                      )}
                    </div>
                  );
                })}
              </>
            ))}

            {/* CTA row */}
            <div className="pt-4" />
            {content.rooms.map((room, i) => (
              <div key={i} className="pt-4 px-4 border-l border-l-border">
                {room.cta && (
                  <a
                    href={room.cta.url}
                    className="block w-full text-center rounded-[var(--radius-md)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {room.cta.text}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
