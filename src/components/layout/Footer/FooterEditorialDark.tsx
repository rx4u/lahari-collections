/* Hallmark · macrostructure: Photographic · genre: editorial
 * footer: Ft6 Letter close · theme: Desert Rose
 */
"use client";

import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer?: FooterConfig;
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
};

export default function FooterEditorialDark({ business, footer }: Props) {
  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  return (
    <footer
      style={{
        backgroundColor: footer?.bgColor ?? "var(--color-primary)",
        color: "var(--color-on-primary)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem) clamp(2.5rem, 4vw, 3rem)",
        }}
      >
        {/* Letter close — single column, off-axis */}
        <div style={{ maxWidth: "560px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.55,
              margin: 0,
            }}
          >
            With love
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.6vw, 3.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              fontWeight: 400,
              margin: "1.25rem 0 0",
            }}
          >
            {business.name}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              opacity: 0.75,
              margin: "1.5rem 0 0",
              fontWeight: 300,
            }}
          >
            {business.address}, {business.city} {business.pincode}
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              opacity: 0.6,
              margin: "0.25rem 0 0",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            By appointment, six days a week.
          </p>
        </div>

        {/* Hairline + sign-off row */}
        <div
          style={{
            marginTop: "clamp(4rem, 8vw, 6rem)",
            paddingTop: "1.5rem",
            borderTop: "1px solid color-mix(in oklch, var(--color-on-primary) 18%, transparent)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              opacity: 0.5,
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} {business.name}
          </p>
          {socialEntries.length > 0 && (
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    color: "var(--color-on-primary)",
                    opacity: 0.6,
                    textDecoration: "none",
                    transition: "opacity 200ms",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.6")}
                >
                  {SOCIAL_LABELS[key] || key}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
