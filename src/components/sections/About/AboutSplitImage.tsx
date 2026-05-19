"use client";

interface AboutSplitImageProps {
  content: {
    headline: string;
    description: string;
    eyebrow?: string;
    subtitle?: string;
    image?: string;
    stats?: Array<{ value: string; label: string }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AboutSplitImage({ content, eyebrow, subtitle }: AboutSplitImageProps) {
  const { headline, description, image, stats } = content;

  const textBlock = (
    <>
      <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
        {headline}
      </h2>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
      {stats && stats.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );

  if (!image) {
    return (
      <section id="about" className="section-y">
        <div className="page-container">
          {textBlock}
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section-y">
      <div className="page-container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <img
            src={image}
            alt={headline}
            className="rounded-[var(--radius-lg)] object-cover w-full h-auto"
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
          />
          <div>{textBlock}</div>
        </div>
      </div>
    </section>
  );
}
