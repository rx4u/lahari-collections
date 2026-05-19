"use client";

import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";

interface PropertyListingsFeaturedCarouselProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    properties: Array<{
      title: string;
      price: string;
      location: string;
      bedrooms: number;
      bathrooms: number;
      area: string;
      status: string;
      image?: string;
      type?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

const STATUS_CLASSES: Record<string, string> = {
  "for sale": "bg-[var(--color-success-soft)] text-[var(--color-success)] border-[color-mix(in_oklch,var(--color-success)_30%,transparent)]",
  sold: "bg-[var(--color-danger-soft)] text-[var(--color-danger)] border-[color-mix(in_oklch,var(--color-danger)_30%,transparent)]",
  rented: "bg-[var(--color-info-soft)] text-[var(--color-info)] border-[color-mix(in_oklch,var(--color-info)_30%,transparent)]",
};

function getStatusClass(status: string) {
  return STATUS_CLASSES[status.toLowerCase()] ?? "bg-primary/10 text-primary border-primary/30";
}

export default function PropertyListingsFeaturedCarousel({
  content,
  eyebrow,
  subtitle,
}: PropertyListingsFeaturedCarouselProps) {
  return (
    <section id="property-listings" className="section-y">
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
          {content.properties.map((property, i) => (
            <div key={i} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card">
              <div className="relative aspect-[4/3] bg-muted">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground/40">
                    <Maximize size={32} />
                  </div>
                )}
                <span
                  className={`absolute top-3 right-3 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusClass(property.status)}`}
                >
                  {property.status}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xl font-bold text-foreground">{property.price}</p>
                <h3 className="mt-1 font-medium text-foreground">{property.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  {property.location}
                </p>
                <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BedDouble size={14} /> {property.bedrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={14} /> {property.bathrooms}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize size={14} /> {property.area}
                  </span>
                  {property.type && (
                    <span className="ml-auto text-xs text-muted-foreground/70">
                      {property.type}
                    </span>
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
