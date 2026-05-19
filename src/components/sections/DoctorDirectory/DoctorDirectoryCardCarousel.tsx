"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Doctor {
  name: string;
  specialization: string;
  department?: string;
  qualification?: string;
  experience?: string;
  image?: string;
  availability?: string;
  cta?: { text: string; url: string };
}

interface DoctorDirectoryCardCarouselProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    doctors: Doctor[];
  };
  eyebrow?: string;
  subtitle?: string;
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function DoctorDirectoryCardCarousel({ content, eyebrow, subtitle }: DoctorDirectoryCardCarouselProps) {
  const { headline, description, doctors } = content;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -264 : 264, behavior: "smooth" });
  };

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              {description}
            </p>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-card border border-border shadow flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="shrink-0 w-60 bg-card border border-border rounded-[var(--radius-lg)] p-5 flex flex-col"
              >
                <div className="flex justify-center mb-4">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {getInitials(doctor.name)}
                    </div>
                  )}
                </div>
                <p className="font-semibold text-foreground text-center font-[family-name:var(--font-display)]">
                  {doctor.name}
                </p>
                <p className="text-primary text-sm text-center mt-1">{doctor.specialization}</p>
                {doctor.department && (
                  <span className="mt-2 self-center bg-muted text-xs text-muted-foreground px-2 py-0.5 rounded-full">
                    {doctor.department}
                  </span>
                )}
                {doctor.cta && (
                  <a
                    href={doctor.cta.url}
                    className="mt-4 block text-center text-sm font-medium py-2 rounded-[var(--radius-sm)] bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    {doctor.cta.text}
                  </a>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-card border border-border shadow flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
