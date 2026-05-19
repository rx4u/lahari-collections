"use client";

import { Quote } from "lucide-react";

type Story = {
  name: string;
  quote: string;
  location?: string;
  image?: string;
  outcome?: string;
};

type ImpactStoriesContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  stories?: Story[];
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ImpactStories({
  content,
  eyebrow,
  subtitle,
}: {
  content: ImpactStoriesContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, stories = [] } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-[var(--radius-lg)] p-6 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="text-primary/30 mb-3" size={36} />

              {/* Quote */}
              <p className="italic text-muted-foreground text-sm leading-relaxed flex-1 mb-4 font-[family-name:var(--font-body)]">
                {story.quote}
              </p>

              {/* Outcome chip */}
              {story.outcome && (
                <span className="inline-block bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 mb-4 self-start font-[family-name:var(--font-body)]">
                  {story.outcome}
                </span>
              )}

              {/* Author */}
              <div className="flex items-center gap-3">
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0 font-[family-name:var(--font-body)]">
                    {initials(story.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground font-[family-name:var(--font-body)]">
                    {story.name}
                  </p>
                  {story.location && (
                    <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                      {story.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
