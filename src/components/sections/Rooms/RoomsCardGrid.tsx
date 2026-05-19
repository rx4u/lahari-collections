"use client";

import { icons, ImageIcon } from "lucide-react";

interface RoomsCardGridProps {
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

export default function RoomsCardGrid({ content, eyebrow, subtitle }: RoomsCardGridProps) {
  return (
    <section id="rooms" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.rooms.map((room, i) => (
            <div key={i} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card">
              <div className="relative aspect-[4/3] bg-muted">
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
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground">{room.name}</h3>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-foreground">{room.price}</p>
                    {room.period && (
                      <p className="text-xs text-muted-foreground">/ {room.period}</p>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{room.description}</p>
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.amenities.map((amenity, j) => {
                      const AmenityIcon = icons[amenity as keyof typeof icons];
                      return (
                        <span
                          key={j}
                          className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {AmenityIcon && <AmenityIcon size={12} />}
                          {amenity}
                        </span>
                      );
                    })}
                  </div>
                )}
                {room.cta && (
                  <a
                    href={room.cta.url}
                    className="mt-4 block w-full text-center rounded-[var(--radius-md)] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {room.cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
