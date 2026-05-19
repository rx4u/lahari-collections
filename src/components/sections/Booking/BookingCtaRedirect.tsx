type BookingContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  calendlyUrl?: string;
  services?: string[];
  ctaText?: string;
  ctaUrl?: string;
  ctaNote?: string;
};

export default function BookingCtaRedirect({
  content,
  eyebrow,
  subtitle,
}: {
  content: BookingContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const {
    headline,
    description,
    services,
    ctaText = "Book Now",
    ctaUrl = "#",
    ctaNote,
  } = content;

  return (
    <section className="section-y">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-foreground mb-4"
        >
          {headline}
        </h2>

        {description && (
          <p className="font-[family-name:var(--font-body)] text-muted-foreground text-lg mb-8 leading-relaxed">
            {description}
          </p>
        )}

        {services && services.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {services.map((service) => (
              <span
                key={service}
                className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full font-[family-name:var(--font-body)]"
              >
                {service}
              </span>
            ))}
          </div>
        )}

        <a
          href={ctaUrl}
          className="inline-block bg-primary text-primary-foreground font-[family-name:var(--font-body)] font-semibold text-base px-8 py-3 rounded-[var(--radius-md)] hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </a>

        {ctaNote && (
          <p className="font-[family-name:var(--font-body)] text-muted-foreground text-sm mt-3">
            {ctaNote}
          </p>
        )}
      </div>
    </section>
  );
}
