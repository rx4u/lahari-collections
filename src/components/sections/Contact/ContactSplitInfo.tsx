/* Hallmark · macrostructure: Photographic · genre: editorial
 * section: Contact — by-appointment close (Ft6-adjacent voice)
 * replaces: contact form + phone/email split (audit major: placeholder names)
 */
"use client";

interface ContactSplitInfoProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
    formFields?: Array<{ name: string; type: string; placeholder: string; required?: boolean }>;
    submitText?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ContactSplitInfo({ content }: ContactSplitInfoProps) {
  const { headline, description, address } = content;
  const mapUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null;

  return (
    <section
      id="contact"
      style={{
        background: "var(--color-surface)",
        padding: "clamp(6rem, 14vw, 11rem) 0",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 6vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)",
          gap: "clamp(2rem, 6vw, 5rem)",
          alignItems: "end",
        }}
        className="contact-grid"
      >
        {/* Left — display headline + body */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: "var(--color-primary)",
              fontWeight: 400,
              margin: 0,
              maxWidth: "12ch",
            }}
          >
            {headline}
          </h2>
          {description && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--color-secondary)",
                fontWeight: 300,
                margin: "1.75rem 0 0",
                maxWidth: "42ch",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Right — address column, vertically aligned with headline baseline */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              opacity: 0.5,
              margin: 0,
              fontWeight: 500,
            }}
          >
            The Atelier
          </p>
          <address
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "normal",
              fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)",
              lineHeight: 1.45,
              color: "var(--color-primary)",
              fontWeight: 400,
              margin: "1rem 0 0",
            }}
          >
            {address}
          </address>
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
                borderBottom: "1px solid var(--color-primary)",
                paddingBottom: "2px",
                marginTop: "1.75rem",
                textDecoration: "none",
                opacity: 0.8,
                transition: "opacity 200ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.8")}
            >
              Find us on the map →
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
