interface BookingCalendlyEmbedProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    calendlyUrl?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function BookingCalendlyEmbed({ content, eyebrow, subtitle }: BookingCalendlyEmbedProps) {
  return (
    <section id="booking" className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        {content.calendlyUrl ? (
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-lg)] border border-border">
            <iframe
              src={content.calendlyUrl}
              title="Book an appointment"
              className="h-[650px] w-full border-0"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-[var(--radius-lg)] border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Booking calendar is not configured yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
