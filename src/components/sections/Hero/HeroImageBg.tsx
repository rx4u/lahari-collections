"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroImageBgProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  image?: string;
}

const blurFade = {
  initial: { opacity: 0, filter: "blur(10px)", y: 20 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const blurTransition = (delay: number) => ({
  duration: 0.8,
  delay,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
});

export default function HeroImageBg({
  headline,
  subheadline,
  cta,
  secondaryCta,
  image,
}: HeroImageBgProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
      style={
        !image
          ? {
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))",
            }
          : undefined
      }
    >
      {/* Ken Burns background image */}
      {image && (
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Gradient overlay — bottom 60%, transparent top to dark bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 60%)",
        }}
      />

      {/* Content — editorial bottom-left placement */}
      <div className="relative z-10 w-full page-container pb-16 sm:pb-20 md:pb-24">
        <motion.h1
          {...blurFade}
          transition={blurTransition(0)}
          className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-[var(--color-on-primary)] max-w-3xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          {...blurFade}
          transition={blurTransition(0.3)}
          className="mt-5 text-base sm:text-lg md:text-xl text-[var(--color-on-primary)]/80 max-w-2xl leading-relaxed"
        >
          {subheadline}
        </motion.p>

        <motion.div
          {...blurFade}
          transition={blurTransition(0.6)}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href={cta.url}
            className="rounded-[var(--radius-md)] px-7 py-3.5 text-sm font-medium transition-colors inline-block"
            style={{
              backgroundColor: "var(--color-tertiary)",
              color: "var(--color-on-primary)",
            }}
          >
            {cta.text}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.url}
              className="border border-white/30 text-[var(--color-on-primary)] hover:bg-white/10 rounded-[var(--radius-md)] px-7 py-3.5 text-sm font-medium transition-colors inline-block"
            >
              {secondaryCta.text}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
