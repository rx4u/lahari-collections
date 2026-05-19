import { MessageCircle } from "lucide-react";

interface BookingWhatsappCtaProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  whatsappNumber?: string;
    whatsappMessage?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function BookingWhatsappCta({ content, eyebrow, subtitle }: BookingWhatsappCtaProps) {
  const phone = (content.whatsappNumber || "").replace(/[^0-9]/g, "");
  const message = encodeURIComponent(content.whatsappMessage || "Hi, I'd like to book an appointment.");
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <section id="booking" className="section-y">
      <div className="page-container">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">
              {content.description}
            </p>
          )}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            // eslint-disable-next-line no-restricted-syntax -- semantic surface: WhatsApp brand-locked green requires white text
            className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-whatsapp)] px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-5" />
            Book via WhatsApp
          </a>
          {content.whatsappNumber && (
            <p className="mt-4 text-sm text-muted-foreground">
              {content.whatsappNumber}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
