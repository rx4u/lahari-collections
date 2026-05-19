"use client";

import { useState } from "react";
import { icons } from "lucide-react";

interface GalleryFullwidthCarouselProps {
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

export default function GalleryFullwidthCarousel({ content, eyebrow, subtitle }: GalleryFullwidthCarouselProps) {
  const [current, setCurrent] = useState(0);
  const ChevronLeft = icons["ChevronLeft"];
  const ChevronRight = icons["ChevronRight"];

  const prev = () => setCurrent((c) => (c === 0 ? content.images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === content.images.length - 1 ? 0 : c + 1));

  return (
    <section id="gallery" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <img
            src={content.images[current]?.src}
            alt={content.images[current]?.alt ?? ""}
            className="aspect-[16/9] w-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
          />
        </div>
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur"
        >
          {ChevronLeft && <ChevronLeft className="size-5 text-foreground" />}
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur"
        >
          {ChevronRight && <ChevronRight className="size-5 text-foreground" />}
        </button>
        {content.images[current]?.caption && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {content.images[current].caption}
          </p>
        )}
        <div className="mt-4 flex justify-center gap-2">
          {content.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`size-2 rounded-full ${
                i === current ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
