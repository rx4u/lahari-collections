"use client";

import { Check, ImageIcon } from "lucide-react";

interface RoomsGalleryCardsProps {
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

export default function RoomsGalleryCards({ content, eyebrow, subtitle }: RoomsGalleryCardsProps) {
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {content.rooms.map((room, i) => (
            <div
              key={i}
              className="border border-border rounded-[var(--radius-lg)] p-6 bg-card"
            >
              {/* Hero image */}
              <div className="relative aspect-[16/9] rounded-[var(--radius-lg)] overflow-hidden bg-muted mb-4">
                {room.image ? (
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground/40">
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>

              {/* Content: 2-col layout */}
              <div className="flex gap-4">
                {/* Left: name + description */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground text-lg">
                    {room.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                    {room.description}
                  </p>
                </div>

                {/* Right: price + amenities + CTA */}
                <div className="shrink-0 flex flex-col items-end gap-3 min-w-[140px]">
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary font-[family-name:var(--font-body)]">
                      {room.price}
                    </p>
                    {room.period && (
                      <p className="text-xs text-muted-foreground">/ {room.period}</p>
                    )}
                  </div>

                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap justify-end gap-1">
                      {room.amenities.map((amenity, j) => (
                        <span
                          key={j}
                          className="flex items-center gap-1 bg-muted text-xs px-2 py-1 rounded-full text-muted-foreground"
                        >
                          <Check size={10} className="text-primary shrink-0" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  {room.cta && (
                    <a
                      href={room.cta.url}
                      className="rounded-[var(--radius-md)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 whitespace-nowrap"
                    >
                      {room.cta.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
