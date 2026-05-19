"use client";

import { motion } from "framer-motion";

interface LocationItem {
  city: string;
  label?: string;
  image: string;
  imagePosition?: string;
  url?: string;
}

interface GalleryLocationGridProps {
  content: {
    eyebrow?: string;
    headline?: string;
    items: LocationItem[];
    cta?: { text: string; url: string };
  };
}

export default function GalleryLocationGrid({ content }: GalleryLocationGridProps) {
  const { eyebrow, headline, items, cta } = content;

  return (
    <section
      id="gallery"
      style={{
        background: "var(--color-surface)",
        padding: "clamp(80px, 10vw, 120px) clamp(1.5rem, 8vw, 8rem) 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

        {/* Header */}
        {(eyebrow || headline) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}
          >
            {eyebrow && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: `color-mix(in oklch, var(--color-neutral) 50%, transparent)`,
                  fontWeight: 300,
                  marginBottom: "0.75rem",
                }}
              >
                {eyebrow}
              </p>
            )}
            {headline && (
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  lineHeight: "1.15",
                  color: "var(--color-neutral)",
                  letterSpacing: "0.01em",
                }}
              >
                {headline}
              </h2>
            )}
          </motion.div>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
          }}
          className="location-grid"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.07 }}
              className="location-card"
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "4/5",
                cursor: item.url ? "pointer" : "default",
              }}
            >
              {/* Gold border on hover */}
              <div
                className="location-card-border"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 10,
                  pointerEvents: "none",
                  border: "2px solid var(--color-tertiary)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              />

              {/* Image */}
              <img
                src={item.image}
                alt={`${item.city} luxury real estate`}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: item.imagePosition || "center",
                  transition: "transform 0.5s ease",
                }}
                className="location-card-image"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />

              {/* Gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                }}
              />

              {/* Text */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.25rem",
                  zIndex: 10,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    color: "var(--color-on-primary)",
                    lineHeight: 1.2,
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.city}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "0.35rem",
                  }}
                >
                  {item.label && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.55)",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </p>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                        textDecoration: "none",
                      }}
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {cta && (
          <div
            style={{
              textAlign: "center",
              marginTop: "clamp(2.5rem, 4vw, 4rem)",
              paddingBottom: "clamp(40px, 6vw, 80px)",
            }}
          >
            <a
              href={cta.url}
              style={{
                display: "inline-block",
                border: "1px solid var(--color-neutral)",
                color: "var(--color-neutral)",
                padding: "0.75rem 2rem",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.target as HTMLAnchorElement;
                el.style.background = "var(--color-neutral)";
                el.style.color = "var(--color-surface)";
              }}
              onMouseLeave={(e) => {
                const el = e.target as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "var(--color-neutral)";
              }}
            >
              {cta.text}
            </a>
          </div>
        )}
      </div>

      <style>{`
        .location-card:hover .location-card-border { opacity: 1; }
        .location-card:hover .location-card-image { transform: scale(1.04); }
        @media (max-width: 640px) {
          .location-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
