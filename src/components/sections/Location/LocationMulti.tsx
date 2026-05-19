'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface LocationBranch {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  hours?: string;
}

interface LocationMultiProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    locations: LocationBranch[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function LocationMulti({ content, eyebrow, subtitle }: LocationMultiProps) {
  const { headline, locations } = content;
  const [active, setActive] = useState(0);
  const branch = locations[active];

  return (
    <section className="section-y px-4">
      <div className="max-w-4xl mx-auto">
        {headline && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-foreground text-center mb-8">
            {headline}
          </h2>
        )}

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {locations.map((loc, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                i === active
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-[var(--radius-md)] p-6 space-y-4">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-foreground">
              {branch.name}
            </h3>
            <div className="flex gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{branch.address}</span>
            </div>
            {branch.phone && (
              <div className="flex gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${branch.phone}`} className="hover:text-foreground transition-colors">
                  {branch.phone}
                </a>
              </div>
            )}
            {branch.email && (
              <div className="flex gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${branch.email}`} className="hover:text-foreground transition-colors">
                  {branch.email}
                </a>
              </div>
            )}
            {branch.hours && (
              <div className="flex gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{branch.hours}</span>
              </div>
            )}
          </div>

          <div className="rounded-[var(--radius-md)] overflow-hidden border border-border bg-muted h-64 md:h-auto">
            {branch.mapUrl ? (
              <iframe
                src={branch.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '256px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map for ${branch.name}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Map unavailable</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
