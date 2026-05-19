type ClassScheduleContent = {
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

export default function ClassScheduleCalendarView({
  content,
  eyebrow,
  subtitle,
}: {
  content: ClassScheduleContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, schedule } = content;

  return (
    <section className="section-y page-container">
      <div className="text-center mb-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-foreground mb-3">
          {headline}
        </h2>
        {description && (
          <p className="font-[family-name:var(--font-body)] text-muted-foreground text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid gap-px bg-border rounded-[var(--radius-md)] overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${schedule.length}, minmax(120px, 1fr))` }}
        >
          {schedule.map((dayEntry) => (
            <div key={dayEntry.day} className="bg-background">
              <div className="bg-muted px-3 py-2 text-center sticky top-0">
                <span className="font-[family-name:var(--font-display)] font-semibold text-foreground text-sm">
                  {dayEntry.day}
                </span>
              </div>

              <div className="p-2 flex flex-col gap-1 min-h-[120px]">
                {dayEntry.slots.map((slot, i) => (
                  <span
                    key={i}
                    className="bg-primary/10 text-primary rounded-[var(--radius-sm)] text-xs p-2 block leading-snug"
                  >
                    <span className="font-[family-name:var(--font-body)] text-muted-foreground block text-[10px] mb-0.5">
                      {slot.time}
                    </span>
                    <span className="font-[family-name:var(--font-body)] font-medium">
                      {slot.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
