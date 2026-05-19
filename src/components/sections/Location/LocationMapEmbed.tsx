interface LocationMapEmbedProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    address?: string;
    mapUrl?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function LocationMapEmbed({ content, eyebrow, subtitle }: LocationMapEmbedProps) {
  const { headline, address, mapUrl } = content;

  return (
    <section id="location" className="section-y">
      <div className="page-container">
        {headline && (
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            {headline}
          </h2>
        )}
        {mapUrl ? (
          <iframe
            src={mapUrl}
            className="w-full h-80 rounded-[var(--radius-lg)] border-0"
            loading="lazy"
            title="Location map"
          />
        ) : (
          <div className="bg-muted rounded-[var(--radius-lg)] h-80 flex items-center justify-center">
            <span className="text-muted-foreground">Map coming soon</span>
          </div>
        )}
        {address && (
          <p className="text-muted-foreground mt-4 text-center">{address}</p>
        )}
      </div>
    </section>
  );
}
