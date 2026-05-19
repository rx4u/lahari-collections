"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

interface StatsDarkSplitProps {
  content: {
    eyebrow?: string;
    headline: string;
    description: string;
    cta?: { text: string; url: string };
    image?: string;
    imagePosition?: string;
    stats: StatItem[];
  };
}

export default function StatsDarkSplit({ content }: StatsDarkSplitProps) {
  const { eyebrow, headline, description, cta, image, imagePosition = "center 40%", stats } = content;

  return (
    <section
      id="stats"
      style={{
        background: "var(--color-forced-dark)",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "46% 1fr",
      }}
      className="stats-dark-split-grid"
    >
      {/* Left — bleed image with masthead overlay */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: imagePosition,
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-tertiary) 100%)",
            }}
          />
        )}
        {/* Bottom-fade overlay for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,24,20,0.92) 0%, rgba(26,24,20,0.4) 45%, rgba(26,24,20,0.1) 100%)",
          }}
        />
        {/* Masthead overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(2rem, 5vw, 4rem)",
            left: "clamp(2rem, 5vw, 4rem)",
            right: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          {eyebrow && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--color-tertiary)",
                fontWeight: 500,
                marginBottom: "0.75rem",
              }}
            >
              {eyebrow}
            </p>
          )}
          {cta && (
            <a
              href={cta.url}
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "var(--color-on-image)",
                padding: "0.65rem 1.5rem",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                transition: "background 0.2s",
                marginTop: "1.5rem",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.background = "transparent")}
            >
              {cta.text}
            </a>
          )}
        </div>
      </div>

      {/* Right — copy + stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(60px, 8vw, 120px) clamp(2.5rem, 6vw, 6rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-tertiary)",
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            {eyebrow || "The Publication"}
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              lineHeight: "1.08",
              color: "var(--color-on-forced-dark)",
              letterSpacing: "0.01em",
              marginBottom: "1.75rem",
            }}
          >
            {headline}
          </h2>

          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--color-tertiary)",
              marginBottom: "1.75rem",
              opacity: 0.7,
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.0625rem",
              lineHeight: "1.75",
              color: "var(--color-on-forced-dark-muted)",
              fontWeight: 300,
              maxWidth: "460px",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            {description}
          </p>
        </motion.div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
              paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
              borderTop: `1px solid color-mix(in oklch, var(--color-on-forced-dark) 12%, transparent)`,
            }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    lineHeight: 1,
                    letterSpacing: "0.01em",
                    marginBottom: "0.5rem",
                    color: "var(--color-tertiary)",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-on-forced-dark-muted)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-dark-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
