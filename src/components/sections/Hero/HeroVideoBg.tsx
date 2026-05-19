"use client";

interface HeroVideoBgProps {
  headline: string;
  subheadline: string;
  cta: { text: string; url: string };
  secondaryCta?: { text: string; url: string };
  video?: string;
  image?: string;
}

export default function HeroVideoBg({
  headline,
  subheadline,
  cta,
  secondaryCta,
  video,
  image,
}: HeroVideoBgProps) {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-tertiary))" }} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5 z-[1]" />

      <div className="relative z-10 page-container">
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-on-image)]">
          {headline}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-[var(--color-on-image-muted)] max-w-2xl">
          {subheadline}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={cta.url}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block"
          >
            {cta.text}
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.url}
              // eslint-disable-next-line no-restricted-syntax -- photo overlay: outlined button on video background
              className="border border-white/30 text-[var(--color-on-image)] hover:bg-white/10 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors inline-block"
            >
              {secondaryCta.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
