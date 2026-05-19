import { Award } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface AchievementsBadgeGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      title: string;
      year?: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
    icon?: string;
      category?: string;
      badge?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

function DynamicIcon({ name }: { name?: string }) {
  if (!name) return <Award size={40} className="text-primary" />;
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
  return Icon ? <Icon size={40} className="text-primary" /> : <Award size={40} className="text-primary" />;
}

export default function AchievementsBadgeGrid({ content, eyebrow, subtitle }: AchievementsBadgeGridProps) {
  return (
    <section className="section-y">
      <div className="page-container">
        {(content.headline || content.description) && (
          <div className="text-center mb-12">
            {content.headline && (
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">
                {content.headline}
              </h2>
            )}
            {content.description && (
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">{content.description}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-[var(--radius-lg)] p-4 flex flex-col items-center text-center"
            >
              <DynamicIcon name={item.icon} />
              <p className="font-semibold text-sm mt-2 text-foreground leading-tight">{item.title}</p>
              {item.category && (
                <span className="mt-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              )}
              {item.year && (
                <p className="text-xs text-muted-foreground mt-1">{item.year}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
