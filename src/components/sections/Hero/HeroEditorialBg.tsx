"use client";

import { motion } from "framer-motion";

interface HeroEditorialBgProps {
  headline: string;
  subheadline: string;
  eyebrow?: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  image?: string;
  credentialBar?: { items: Array<{ text: string }> };
}

export default function HeroEditorialBg({
  headline,
  subheadline,
  eyebrow,
  cta,
  secondaryCta,
  image,
  credentialBar,
}: HeroEditorialBgProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full"
        style={{ height: "115%", top: "-7.5%" }}
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
            fetchPriority="high"
            onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-tertiary) 100%)",
            }}
          />
        )}
      </div>

      {/* Top gradient — nav zone */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "260px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Directional overlay — bottom-left anchors text */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.04) 100%)",
        }}
      />

      {/* Content — bottom-left */}
      <div
        className="relative z-10 flex flex-col justify-end h-full"
        style={{ padding: "0 clamp(1.5rem, 8vw, 8rem) clamp(3.5rem, 7vw, 6rem)" }}
      >
        <div style={{ maxWidth: "var(--container-max-w)", margin: "0 auto", width: "100%" }}>

          {/* Gold rule + eyebrow */}
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div
              style={{
                width: "48px",
                height: "1px",
                background: "var(--color-tertiary)",
                marginBottom: "1.25rem",
              }}
            />
            {eyebrow && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-on-image-muted)",
                  fontWeight: 500,
                  marginBottom: "1.25rem",
                }}
              >
                {eyebrow}
              </p>
            )}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)",
              lineHeight: "1.1",
              color: "var(--color-on-image)",
              letterSpacing: "0.01em",
              maxWidth: "22ch",
              marginBottom: "1.5rem",
            }}
          >
            {headline}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.32 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.9375rem, 1.25vw, 1.0625rem)",
              lineHeight: 1.6,
              color: "var(--color-on-image-muted)",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            {subheadline}
          </motion.p>

          {/* Credential bar */}
          {credentialBar && credentialBar.items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0 2rem",
                marginTop: "1.25rem",
              }}
            >
              {credentialBar.items.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-on-image-subtle)",
                  }}
                >
                  {item.text}
                </span>
              ))}
            </motion.div>
          )}

          {/* CTA pair */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.44 }}
            style={{ display: "flex", gap: "1rem", marginTop: "2.25rem", flexWrap: "wrap" }}
          >
            <a
              href={cta.url}
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.92)",
                color: "var(--color-primary)",
                padding: "0.75rem 1.75rem",
                fontSize: "0.8125rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.background = "var(--color-on-image)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.92)")}
            >
              {cta.text}
            </a>
            {secondaryCta && (
              <a
                href={secondaryCta.url}
                style={{
                  display: "inline-block",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "var(--color-on-image)",
                  padding: "0.75rem 1.75rem",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.background = "transparent")}
              >
                {secondaryCta.text}
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute flex flex-col items-center gap-2"
        style={{
          bottom: "2.5rem",
          right: "clamp(1.5rem, 8vw, 8rem)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-on-image-subtle)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--color-on-image-subtle), transparent)",
          }}
        />
      </div>
    </section>
  );
}
