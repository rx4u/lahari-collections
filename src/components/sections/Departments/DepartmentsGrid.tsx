import { icons, Building2, type LucideIcon } from "lucide-react";

interface DepartmentsGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  departments: Array<{
      name: string;
      description: string;
    eyebrow?: string;
    subtitle?: string;
    icon?: string;
      head?: string;
      specialties?: string[];
      image?: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function DepartmentsGrid({ content, eyebrow, subtitle }: DepartmentsGridProps) {
  const { headline, description, departments } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-semibold text-foreground font-[family-name:var(--font-display)]"
          >
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const IconComponent: LucideIcon =
              (dept.icon ? (icons as Record<string, LucideIcon>)[dept.icon] : null) ?? Building2;
            return (
              <div
                key={dept.name}
                className="bg-card border border-border rounded-[var(--radius-md)] p-6"
              >
                <IconComponent className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground font-[family-name:var(--font-display)]">
                  {dept.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-2 font-[family-name:var(--font-body)]">
                  {dept.description}
                </p>
                {dept.head && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Head: {dept.head}
                  </p>
                )}
                {dept.specialties && dept.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {dept.specialties.map((s) => (
                      <span
                        key={s}
                        className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
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
