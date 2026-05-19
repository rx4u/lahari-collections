"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

interface TestimonialsEditorialCarouselProps {
  content: {
    items: TestimonialItem[];
    autoAdvance?: number;
  };
}

export default function TestimonialsEditorialCarousel({ content }: TestimonialsEditorialCarouselProps) {
  const { items, autoAdvance = 6000 } = content;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      if (index === active) return;
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const next = useCallback(() => {
    goTo((active + 1) % items.length);
  }, [active, goTo, items.length]);

  const prev = useCallback(() => {
    goTo((active - 1 + items.length) % items.length);
  }, [active, goTo, items.length]);

  useEffect(() => {
    if (autoAdvance <= 0) return;
    const id = setInterval(next, autoAdvance);
    return () => clearInterval(id);
  }, [next, autoAdvance]);

  const t = items[active];
  if (!t) return null;

  return (
    <section
      id="testimonials"
      style={{
        background: "var(--color-surface)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(100px, 12vw, 160px) clamp(1.5rem, 8vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Oversized decorative quotemark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "clamp(1rem, 4vw, 3rem)",
          left: "clamp(1.5rem, 6vw, 5rem)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 18vw, 18rem)",
          lineHeight: 1,
          color: "var(--color-primary)",
          opacity: 0.04,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>

      <div
        style={{
          maxWidth: "min(900px, var(--container-max-w))",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Slide content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, y: direction > 0 ? 12 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -12 : 12 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
          >
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontStyle: "italic",
                lineHeight: "1.5",
                color: "var(--color-primary)",
                letterSpacing: "0.01em",
                marginBottom: "2.5rem",
              }}
            >
              {t.quote}
            </blockquote>

            <div
              style={{
                width: "32px",
                height: "1px",
                background: "var(--color-secondary)",
                margin: "0 auto 1.5rem",
                opacity: 0.3,
              }}
            />

            <cite
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-secondary)",
                fontStyle: "normal",
                fontWeight: 400,
              }}
            >
              {t.name}, {t.title}
            </cite>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "var(--color-primary)",
              opacity: 0.4,
              transition: "opacity 0.2s",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.4")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12.5 15L7.5 10L12.5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dash-dot nav */}
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20px",
                  height: "20px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: i === active ? "20px" : "5px",
                    height: "1px",
                    background: "var(--color-primary)",
                    opacity: i === active ? 0.9 : 0.25,
                    transition: "width 0.35s ease, opacity 0.35s ease",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "var(--color-primary)",
              opacity: 0.4,
              transition: "opacity 0.2s",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.4")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7.5 5L12.5 10L7.5 15" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
