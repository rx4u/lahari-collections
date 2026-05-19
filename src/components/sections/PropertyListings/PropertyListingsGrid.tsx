"use client";

import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";

interface Property {
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: string;
  image?: string;
  type?: string;
}

interface PropertyListingsGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    properties: Property[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function PropertyListingsGrid({ content, eyebrow, subtitle }: PropertyListingsGridProps) {
  const { headline, description, properties } = content;

  return (
    <section className="section-y page-container">
      <div className="text-center mb-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-3">
          {headline}
        </h2>
        {description && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-[var(--radius-md)] overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] bg-muted">
              {property.image ? (
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : null}
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-[var(--radius-sm)] font-medium">
                {property.status}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-foreground text-base mb-1 leading-snug">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{property.location}</span>
              </div>
              <div className="text-primary font-bold text-lg mb-3">{property.price}</div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                <span className="flex items-center gap-1">
                  <BedDouble className="w-3.5 h-3.5" />
                  {property.bedrooms} Bed
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" />
                  {property.bathrooms} Bath
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="w-3.5 h-3.5" />
                  {property.area}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
