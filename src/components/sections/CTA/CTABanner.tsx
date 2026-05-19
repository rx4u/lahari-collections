"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface CTABannerProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    image?: string;
    cta: { text: string; url: string };
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function CTABanner({ content }: CTABannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          y: reducedMotion ? 0 : bgY,
          background: content.image
            ? undefined
            : "linear-gradient(135deg, var(--color-primary), color-mix(in oklch, var(--color-primary) 70%, var(--color-tertiary)))",
        }}
      >
        {content.image && (
          <>
            <img
              src={content.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Content */}
      <div className="page-container py-16 md:py-20 text-center" style={{ position: "relative" }}>
        <motion.h2
          initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--color-on-primary)]"
        >
          {content.headline}
        </motion.h2>
        {content.description && (
          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-4 text-lg text-[var(--color-on-primary)]/80 max-w-2xl mx-auto"
          >
            {content.description}
          </motion.p>
        )}
        <motion.a
          href={content.cta.url}
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-8 bg-card text-foreground hover:bg-card/90 rounded-[var(--radius-md)] px-8 py-3 text-sm font-medium transition-colors inline-block"
        >
          {content.cta.text}
        </motion.a>
      </div>
    </section>
  );
}
