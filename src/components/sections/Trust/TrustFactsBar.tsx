interface TrustFactsBarProps {
  content: {
    facts: string[];
  };
}

export default function TrustFactsBar({ content }: TrustFactsBarProps) {
  const { facts } = content;
  if (!facts || facts.length === 0) return null;

  return (
    <section
      id="trust"
      style={{
        background: "var(--color-neutral)",
        padding: "1.25rem clamp(1.5rem, 8vw, 8rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "0 2.5rem",
        }}
      >
        {facts.map((fact, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: `color-mix(in oklch, var(--color-surface) 55%, transparent)`,
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              {fact}
            </span>
            {i < facts.length - 1 && (
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: `color-mix(in oklch, var(--color-surface) 25%, transparent)`,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
