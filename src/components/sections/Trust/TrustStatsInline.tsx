"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  icon?: string;
}

interface TrustStatsInlineProps {
  content: {
    stats: StatItem[];
    bordered?: boolean;
  };
}

export default function TrustStatsInline({ content }: TrustStatsInlineProps) {
  const { stats, bordered = true } = content;
  if (!stats || stats.length === 0) return null;

  return (
    <section
      id="trust"
      style={{
        background: "var(--color-surface)",
        padding: "clamp(2rem, 4vw, 3rem) clamp(1.5rem, 8vw, 8rem)",
        borderTop: bordered ? `1px solid color-mix(in oklch, var(--color-neutral) 10%, transparent)` : "none",
        borderBottom: bordered ? `1px solid color-mix(in oklch, var(--color-neutral) 10%, transparent)` : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
        className="trust-stats-inline-grid"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.25rem",
              paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 2.5rem)" : 0,
              borderLeft: i > 0 ? `1px solid color-mix(in oklch, var(--color-neutral) 12%, transparent)` : "none",
            }}
            className="trust-stat-item"
          >
            {stat.icon && (
              <span
                style={{
                  fontSize: "1.125rem",
                  marginBottom: "0.25rem",
                  lineHeight: 1,
                }}
              >
                {stat.icon}
              </span>
            )}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                lineHeight: 1,
                letterSpacing: "0.01em",
                color: "var(--color-primary)",
                marginBottom: 0,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: `color-mix(in oklch, var(--color-neutral) 50%, transparent)`,
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .trust-stats-inline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .trust-stat-item {
            padding-left: 0 !important;
            border-left: none !important;
            padding-top: clamp(1rem, 2vw, 1.5rem);
            border-top: 1px solid color-mix(in oklch, var(--color-neutral) 12%, transparent);
          }
          .trust-stat-item:nth-child(1),
          .trust-stat-item:nth-child(2) {
            padding-top: 0;
            border-top: none;
          }
        }
      `}</style>
    </section>
  );
}
