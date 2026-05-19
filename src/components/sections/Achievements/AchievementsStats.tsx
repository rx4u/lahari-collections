import { Trophy } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface AchievementsStatsProps {
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
  if (!name) return <Trophy size={32} className="text-primary" />;
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
  return Icon ? <Icon size={32} className="text-primary" /> : <Trophy size={32} className="text-primary" />;
}

export default function AchievementsStats({ content, eyebrow, subtitle }: AchievementsStatsProps) {
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-[var(--radius-md)] p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                <DynamicIcon name={item.icon} />
              </div>
              <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-primary leading-tight">
                {item.title}
              </p>
              {item.year && (
                <p className="text-muted-foreground text-sm mt-1">{item.year}</p>
              )}
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
              {item.badge && (
                <span className="inline-block mt-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
