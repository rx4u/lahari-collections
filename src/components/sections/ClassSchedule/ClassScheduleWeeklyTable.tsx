"use client";

interface ClassScheduleWeeklyTableProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  schedule: Array<{
      day: string;
      slots: Array<{
        time: string;
        name: string;
        type?: string;
        instructor?: string;
      }>;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

// Class type → semantic token mapping. 5 categories collapse to 4 tokens:
// strength + pilates both map to info (both are control/form-focused, vs explosive cardio/hiit).
const TYPE_COLORS: Record<string, string> = {
  cardio: "bg-[var(--color-danger-soft)] text-[var(--color-danger)] border-[color-mix(in_oklch,var(--color-danger)_30%,transparent)]",
  strength: "bg-[var(--color-info-soft)] text-[var(--color-info)] border-[color-mix(in_oklch,var(--color-info)_30%,transparent)]",
  yoga: "bg-[var(--color-success-soft)] text-[var(--color-success)] border-[color-mix(in_oklch,var(--color-success)_30%,transparent)]",
  hiit: "bg-[var(--color-warning-soft)] text-[var(--color-warning)] border-[color-mix(in_oklch,var(--color-warning)_30%,transparent)]",
  pilates: "bg-[var(--color-info-soft)] text-[var(--color-info)] border-[color-mix(in_oklch,var(--color-info)_30%,transparent)]",
};

function getTypeClass(type?: string) {
  if (!type) return "bg-muted text-muted-foreground border-border";
  return TYPE_COLORS[type.toLowerCase()] ?? "bg-primary/10 text-primary border-primary/30";
}

export default function ClassScheduleWeeklyTable({ content, eyebrow, subtitle }: ClassScheduleWeeklyTableProps) {
  return (
    <section id="class-schedule" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>

        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  {content.schedule.map((day) => (
                    <th
                      key={day.day}
                      className="border-b border-border px-4 py-3 text-left text-sm font-semibold text-foreground"
                    >
                      {day.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.max(...content.schedule.map((d) => d.slots.length)),
                }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {content.schedule.map((day) => {
                      const slot = day.slots[rowIndex];
                      return (
                        <td
                          key={day.day}
                          className="border-b border-border px-4 py-3 align-top"
                        >
                          {slot ? (
                            <div>
                              <p className="text-xs text-muted-foreground">{slot.time}</p>
                              <p className="mt-1 text-sm font-medium text-foreground">
                                {slot.name}
                              </p>
                              {slot.type && (
                                <span
                                  className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${getTypeClass(slot.type)}`}
                                >
                                  {slot.type}
                                </span>
                              )}
                              {slot.instructor && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {slot.instructor}
                                </p>
                              )}
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
