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

export default function ClassScheduleCardGrid({
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((dayEntry) => (
          <div
            key={dayEntry.day}
            className="bg-card border border-border rounded-[var(--radius-md)] p-4"
          >
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-primary text-base mb-3 pb-2 border-b border-border">
              {dayEntry.day}
            </h3>

            <div className="flex flex-col gap-2">
              {dayEntry.slots.map((slot, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-[family-name:var(--font-body)] text-xs text-muted-foreground w-20 shrink-0">
                    {slot.time}
                  </span>
                  <span className="font-[family-name:var(--font-body)] font-medium text-foreground text-sm flex-1 leading-snug">
                    {slot.name}
                  </span>
                  {slot.type && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-[family-name:var(--font-body)] shrink-0">
                      {slot.type}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
