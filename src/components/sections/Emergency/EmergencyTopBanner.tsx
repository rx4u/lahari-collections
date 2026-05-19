import { Phone } from "lucide-react";

interface EmergencyTopBannerProps {
  content: {
    headline: string;
    phone: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function EmergencyTopBanner({ content, eyebrow, subtitle }: EmergencyTopBannerProps) {
  return (
    <section id="emergency" className="bg-[var(--color-danger)] py-4 sm:py-5">
      <div className="page-container">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="text-center sm:text-left">
            {/* eslint-disable-next-line no-restricted-syntax -- semantic surface: text on danger-red banner */}
            <p className="text-sm font-bold uppercase tracking-wider text-white">
              {content.headline}
            </p>
            {content.description && (
              // eslint-disable-next-line no-restricted-syntax -- semantic surface: description on danger-red banner
              <p className="mt-0.5 text-sm text-white/85">
                {content.description}
              </p>
            )}
          </div>
          <a
            href={`tel:${content.phone.replace(/[^0-9+]/g, "")}`}
            // eslint-disable-next-line no-restricted-syntax -- semantic surface: white pill button on danger-red banner
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 py-2 text-sm font-semibold text-[var(--color-danger)] transition-opacity hover:opacity-90"
          >
            <Phone className="size-4" />
            Call Now: {content.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
