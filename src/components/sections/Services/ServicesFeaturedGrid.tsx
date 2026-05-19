"use client";

import { icons } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  price?: string;
  duration?: string;
}

interface ServicesFeaturedGridProps {
  content: {
    headline: string;
    description?: string;
    items: ServiceItem[];
  };
  eyebrow?: string;
}

export default function ServicesFeaturedGrid({ content, eyebrow }: ServicesFeaturedGridProps) {
  const [featured, ...rest] = content.items;

  return (
    <section id="services" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{eyebrow}</p>
          )}
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-[var(--color-neutral)]/70">{content.description}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured && (
            <div className="md:col-span-2 lg:col-span-1 relative overflow-hidden rounded-[var(--radius-lg)] min-h-[280px] flex flex-col justify-end"
              style={{ background: "var(--color-primary)" }}
            >
              {featured.image && (
                <>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </>
              )}
              <div className="relative z-10 p-6">
                {featured.price && (
                  // eslint-disable-next-line no-restricted-syntax -- photo overlay: price on darkened featured service image
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2 block">{featured.price}</span>
                )}
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: title on darkened featured service image */}
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">{featured.title}</h3>
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: description on darkened featured service image */}
                <p className="mt-2 text-sm text-white/75">{featured.description}</p>
                {featured.duration && (
                  // eslint-disable-next-line no-restricted-syntax -- photo overlay: duration on darkened featured service image
                  <p className="mt-3 text-xs text-white/50">{featured.duration}</p>
                )}
              </div>
            </div>
          )}

          {rest.map((item, i) => {
            const LucideIcon = item.icon ? icons[item.icon as keyof typeof icons] : null;
            return (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] border border-[var(--color-neutral)]/10 bg-[var(--color-surface)] p-6 flex flex-col"
              >
                {LucideIcon && (
                  <LucideIcon className="mb-4 size-5 text-[var(--color-primary)]" strokeWidth={1.5} />
                )}
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-neutral)]/70 flex-1">{item.description}</p>
                {(item.price || item.duration) && (
                  <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-neutral)]/50">
                    {item.price && <span>{item.price}</span>}
                    {item.price && item.duration && <span>·</span>}
                    {item.duration && <span>{item.duration}</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
