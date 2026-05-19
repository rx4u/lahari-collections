"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialsCarouselProps {
  content: {
    headline: string;
    eyebrow?: string;
    subtitle?: string;
    items: Array<{
      name: string;
      text: string;
      rating?: number;
      role?: string;
      image?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function TestimonialsCarousel({ content, eyebrow, subtitle }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const { headline, items } = content;

  if (!items || items.length === 0) return null;

  const prev = () => setCurrent((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === items.length - 1 ? 0 : i + 1));

  const item = items[current];

  return (
    <section id="testimonials" className="section-y">
      <div className="page-container">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
          {headline}
        </h2>

        <div className="relative flex items-center justify-center">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="max-w-2xl mx-auto text-center px-12">
            {item.rating != null && item.rating > 0 && (
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-primary fill-primary" />
                ))}
              </div>
            )}

            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
            )}

            <blockquote className="text-lg md:text-xl text-foreground italic mb-6">
              &ldquo;{item.text}&rdquo;
            </blockquote>

            <p className="font-medium text-foreground">{item.name}</p>
            {item.role && (
              <p className="text-sm text-muted-foreground mt-1">{item.role}</p>
            )}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {items.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
