import { icons } from "lucide-react";

interface TrustInlineListProps {
  content: {
    headline?: string;
    items: Array<{
      title: string;
      description?: string;
      icon?: string;
    }>;
  };
}

export default function TrustInlineList({ content }: TrustInlineListProps) {
  return (
    <section className="section-y border-y border-[var(--color-neutral)]/10">
      <div className="page-container">
        {content.headline && (
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral)]/50 text-center">{content.headline}</p>
        )}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {content.items.map((item, i) => {
            const LucideIcon = item.icon ? icons[item.icon as keyof typeof icons] : null;
            return (
              <div key={i} className="flex items-center gap-2.5">
                {LucideIcon && (
                  <LucideIcon className="size-4 text-[var(--color-primary)] shrink-0" strokeWidth={1.5} />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-[var(--color-neutral)]/60">{item.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
