"use client";

interface AboutEditorialSplitProps {
  content: {
    headline: string;
    description: string;
    description2?: string;
    eyebrow?: string;
    cta?: { text: string; url: string };
    image?: string;
    imagePosition?: string;
  };
}

export default function AboutEditorialSplit({ content }: AboutEditorialSplitProps) {
  const { headline, description, description2, eyebrow, cta, image, imagePosition = "center 30%" } = content;
  const lines = headline.split("\n").filter(Boolean);

  return (
    <section
      id="about"
      style={{
        background: "var(--color-surface)",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}
        className="editorial-split-grid"
      >
        {/* Left — text column */}
        <div
          style={{
            padding: "clamp(80px, 10vw, 140px) clamp(2rem, 4vw, 5rem) clamp(80px, 10vw, 140px) clamp(1.5rem, 8vw, 8rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "var(--color-secondary)",
              marginBottom: "2rem",
              opacity: 0.4,
            }}
          />

          {eyebrow && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "var(--color-primary)",
                fontWeight: 500,
                marginBottom: "clamp(2rem, 4vw, 3rem)",
                opacity: 0.7,
              }}
            >
              {eyebrow}
            </p>
          )}

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 3.6vw, 3.75rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.01em",
              color: "var(--color-primary)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            {lines.length > 0
              ? lines.map((line, i) => (
                  <span key={i} style={{ display: "block" }}>
                    {line}
                  </span>
                ))
              : headline}
          </h2>

          <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
            <p
              className="max-w-[480px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                lineHeight: "1.75",
                color: "var(--color-secondary)",
                fontWeight: 300,
              }}
            >
              {description}
            </p>
            {description2 && (
              <p
                className="max-w-[480px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  lineHeight: "1.75",
                  color: "var(--color-secondary)",
                  fontWeight: 300,
                  marginTop: "1rem",
                }}
              >
                {description2}
              </p>
            )}
            {cta && (
              <div style={{ marginTop: "2.5rem" }}>
                <a
                  href={cta.url}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color: "var(--color-primary)",
                    borderBottom: "1px solid var(--color-primary)",
                    paddingBottom: "2px",
                    textDecoration: "none",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.7")}
                >
                  {cta.text}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right — image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "480px",
          }}
        >
          {image ? (
            <img
              src={image}
              alt=""
              aria-hidden="true"
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
                background: "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))",
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .editorial-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
