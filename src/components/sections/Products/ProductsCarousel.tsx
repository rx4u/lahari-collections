"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsCarouselProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    items: Array<{
      name: string;
      price: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    category?: string;
      image?: string;
      cta?: { text: string; url: string };
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ProductsCarousel({ content, eyebrow, subtitle }: ProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section id="products" className="section-y page-container">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 font-[family-name:var(--font-body)] text-muted-foreground">
            {content.description}
          </p>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 rounded-full border border-border bg-background p-2 shadow-sm hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {content.items.map((item, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-[280px] bg-card border border-border rounded-[var(--radius-md)] overflow-hidden"
            >
              <div className="aspect-square w-full bg-muted">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
              </div>
              <div className="p-4">
                {item.category && (
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {item.category}
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-body)] font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-1 font-bold text-primary">{item.price}</p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                {item.cta && (
                  <a
                    href={item.cta.url}
                    className="mt-3 inline-block rounded-[var(--radius-sm)] bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    {item.cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 rounded-full border border-border bg-background p-2 shadow-sm hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </section>
  );
}
