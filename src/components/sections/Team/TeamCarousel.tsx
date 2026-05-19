"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamCarouselProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    members: Array<{ name: string; role: string; image?: string; bio?: string }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamCarousel({ content, eyebrow, subtitle }: TeamCarouselProps) {
  const { headline, description, members } = content;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section id="team" className="section-y">
      <div className="page-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
              {headline}
            </h2>
            {description && (
              <p className="mt-3 text-muted-foreground max-w-xl">{description}</p>
            )}
          </div>
          <div className="flex gap-2 shrink-0 ml-4">
            <button
              onClick={() => scroll("left")}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-accent transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-accent transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {members.map((member) => (
            <div
              key={member.name}
              className="shrink-0 w-56 rounded-xl border border-border bg-card p-5 text-center"
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <div className="bg-primary/10 text-primary rounded-full w-20 h-20 flex items-center justify-center text-xl font-bold mx-auto">
                  {getInitials(member.name)}
                </div>
              )}
              <p className="font-semibold text-foreground mt-4 text-sm">{member.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
