"use client";

import { icons, ImageIcon } from "lucide-react";

interface AmenitiesPhotoGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      name: string;
      icon: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
    image?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AmenitiesPhotoGrid({ content, eyebrow, subtitle }: AmenitiesPhotoGridProps) {
  return (
    <section id="amenities" className="section-y">
      <div className="page-container">
        <div className="mb-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-3 font-[family-name:var(--font-body)] text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
          {content.items.map((item, i) => {
            const LucideIcon = icons[item.icon as keyof typeof icons];

            return (
              <div key={i} className="break-inside-avoid mb-4">
                <div className="rounded-[var(--radius-lg)] overflow-hidden bg-muted aspect-square relative">
                  {(item as { image?: string }).image ? (
                    <img
                      src={(item as { image?: string }).image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      {LucideIcon ? (
                        <LucideIcon size={32} className="text-primary/60" />
                      ) : (
                        <ImageIcon size={32} className="text-muted-foreground/40" />
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-center font-medium text-foreground font-[family-name:var(--font-body)]">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
