/* Hallmark · macrostructure: Photographic · genre: editorial
 * section: Collections lookbook spread (asymmetric, full-bleed)
 * replaces: 3-card banner-grid (audit critical: 3-column feature grid)
 */
"use client";

interface CollectionsBannerGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    collections: Array<{
      name: string;
      description?: string;
      eyebrow?: string;
      subtitle?: string;
      image?: string;
      featured?: boolean;
      cta?: { text: string; url: string };
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

const LAYOUTS = [
  { image: "1 / span 8", caption: "9 / span 4", stack: "row" as const },
  { image: "5 / span 8", caption: "1 / span 4", stack: "row-reverse" as const },
  { image: "2 / span 10", caption: "5 / span 7", stack: "below" as const },
];

export default function CollectionsBannerGrid({ content }: CollectionsBannerGridProps) {
  const { headline, description, collections } = content;

  return (
    <section
      id="collections"
      style={{
        background: "var(--color-surface)",
        padding: "clamp(5rem, 10vw, 9rem) 0 clamp(5rem, 10vw, 9rem)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 6vw, 4rem)",
          marginBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            color: "var(--color-primary)",
            fontWeight: 400,
            margin: 0,
            maxWidth: "16ch",
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
              maxWidth: "44ch",
            }}
          >
            {description}
          </p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6rem, 12vw, 10rem)" }}>
        {collections.map((col, i) => {
          const layout = LAYOUTS[i % LAYOUTS.length];
          const num = String(i + 1).padStart(2, "0");
          const isBelow = layout.stack === "below";

          return (
            <article
              key={i}
              className="collection-spread"
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 clamp(1.5rem, 6vw, 4rem)",
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                gap: "clamp(1.5rem, 3vw, 2.5rem)",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                className="collection-image"
                style={{
                  gridColumn: layout.image,
                  aspectRatio: isBelow ? "16 / 9" : "4 / 5",
                  position: "relative",
                  overflow: "hidden",
                  background: "color-mix(in oklch, var(--color-primary) 8%, var(--color-surface))",
                }}
              >
                {col.image && (
                  <img
                    src={col.image}
                    alt={col.name}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                )}
              </div>

              <div
                className="collection-caption"
                style={{
                  gridColumn: layout.caption,
                  marginTop: isBelow ? "clamp(2rem, 4vw, 3rem)" : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.24em",
                    color: "var(--color-primary)",
                    opacity: 0.45,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  No. {num}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    color: "var(--color-primary)",
                    fontWeight: 400,
                    margin: "0.75rem 0 0",
                  }}
                >
                  {col.name}
                </h3>
                {col.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      lineHeight: 1.75,
                      color: "var(--color-secondary)",
                      fontWeight: 300,
                      margin: "1.25rem 0 0",
                      maxWidth: "42ch",
                    }}
                  >
                    {col.description}
                  </p>
                )}
                {col.cta && (
                  <a
                    href={col.cta.url}
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--color-primary)",
                      borderBottom: "1px solid var(--color-primary)",
                      paddingBottom: "2px",
                      marginTop: "2rem",
                      textDecoration: "none",
                      opacity: 0.8,
                      transition: "opacity 200ms",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.8")}
                  >
                    {col.cta.text}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .collection-spread {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .collection-spread .collection-image,
          .collection-spread .collection-caption {
            grid-column: 1 / -1 !important;
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
