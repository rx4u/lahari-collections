import { MapPin, Car, Train, Phone } from 'lucide-react';

interface LocationDirectionsCardProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    address: string;
    city: string;
    mapUrl?: string;
    landmarks?: string[];
    parking?: string;
    transit?: string;
    phone?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function LocationDirectionsCard({ content, eyebrow, subtitle }: LocationDirectionsCardProps) {
  const { headline, address, city, mapUrl, landmarks, parking, transit, phone } = content;

  return (
    <section className="section-y px-4">
      <div className="max-w-lg mx-auto">
        {headline && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-foreground text-center mb-8">
            {headline}
          </h2>
        )}

        <div className="bg-card border border-border rounded-[var(--radius-md)] p-6 space-y-5">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium">{address}</p>
              <p className="text-muted-foreground text-sm">{city}</p>
            </div>
          </div>

          {phone && (
            <div className="flex gap-3 items-center">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <a href={`tel:${phone}`} className="text-foreground text-sm hover:text-primary transition-colors">
                {phone}
              </a>
            </div>
          )}

          {landmarks && landmarks.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Nearby</p>
              <ul className="space-y-1">
                {landmarks.map((l, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {parking && (
            <div className="flex gap-3 items-start">
              <Car className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{parking}</p>
            </div>
          )}

          {transit && (
            <div className="flex gap-3 items-start">
              <Train className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{transit}</p>
            </div>
          )}

          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-primary text-primary-foreground px-5 py-3 rounded-[var(--radius-sm)] text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Directions
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
