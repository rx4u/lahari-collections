"use client";

interface GalleryMasonryProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  images: Array<{
      src: string;
      alt?: string;
      caption?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function GalleryMasonry({ content, eyebrow, subtitle }: GalleryMasonryProps) {
  return (
    <section id="gallery" className="section-y">
      <div className="page-container">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground text-center">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
            {content.description}
          </p>
        )}
        <div className="mt-12 columns-2 md:columns-3 gap-4 space-y-4">
          {content.images.map((image, index) => (
            <div key={index} className="break-inside-avoid">
              <div className="overflow-hidden rounded-[var(--radius-lg)]">
                <img
                  src={image.src}
                  alt={image.alt || ""}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-[var(--duration-slow)]"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              </div>
              {image.caption && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
