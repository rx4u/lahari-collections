"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

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

interface PropertyListingsMapViewProps {
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

export default function PropertyListingsMapView({ content, eyebrow, subtitle }: PropertyListingsMapViewProps) {
  const { headline, description, properties } = content;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="section-y page-container">
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-3">
          {headline}
        </h2>
        {description && (
          <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
        {/* Map placeholder */}
        <div className="w-full md:w-[60%] rounded-[var(--radius-md)] bg-muted flex items-center justify-center min-h-[300px] md:min-h-0">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <MapPin className="w-8 h-8" />
            <span className="text-sm font-medium">Map view</span>
            <span className="text-xs">Integrate your map provider here</span>
          </div>
        </div>

        {/* Property list */}
        <div className="w-full md:w-[40%] overflow-y-auto space-y-3 pr-1">
          {properties.map((property, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
              className={`w-full text-left flex gap-3 p-3 rounded-[var(--radius-md)] border bg-card transition-all hover:shadow-sm${
                selectedIndex === i
                  ? " ring-2 ring-primary border-primary"
                  : " border-border"
              }`}
            >
              {/* Thumbnail */}
              <div className="w-20 h-16 rounded-[var(--radius-sm)] bg-muted overflow-hidden shrink-0">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : null}
              </div>

              {/* Info */}
              <div className="min-w-0">
                <div className="font-semibold text-sm text-foreground truncate">
                  {property.title}
                </div>
                <div className="text-primary font-bold text-sm mt-0.5">{property.price}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
