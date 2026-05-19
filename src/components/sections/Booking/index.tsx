import BookingWhatsappCta from "./BookingWhatsappCta";
import BookingInlineForm from "./BookingInlineForm";
import BookingCalendlyEmbed from "./BookingCalendlyEmbed";
import BookingCtaRedirect from "./BookingCtaRedirect";

type BookingContent = {
  headline: string;
  description?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  calendlyUrl?: string;
  services?: string[];
};

export default function Booking({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as BookingContent };

  switch (variant) {
    case "whatsapp-cta":
      return <BookingWhatsappCta {...props} />;
    case "inline-form":
      return <BookingInlineForm {...props} />;
    case "calendly-embed":
      return <BookingCalendlyEmbed {...props} />;
    case "cta-redirect":
      return <BookingCtaRedirect {...props} />;
    default:
      return <BookingWhatsappCta {...props} />;
  }
}
