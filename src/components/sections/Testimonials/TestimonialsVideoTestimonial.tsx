"use client";

import { icons } from "lucide-react";

interface TestimonialsVideoTestimonialProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      name: string;
      role: string;
      quote: string;
      videoThumbnail: string;
      videoUrl?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function TestimonialsVideoTestimonial({ content, eyebrow, subtitle }: TestimonialsVideoTestimonialProps) {
  const PlayIcon = icons["Play"];

  return (
    <section id="testimonials" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card">
              <div className="relative aspect-video bg-muted">
                <img
                  src={item.videoThumbnail}
                  alt={`${item.name} testimonial`}
                  className="size-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: play-button scrim on video thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/90">
                    {PlayIcon && <PlayIcon className="size-6 text-primary-foreground" />}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
