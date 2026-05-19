interface HoursCardProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    hours: Record<string, { open: string; close: string } | "closed">;
  };
  eyebrow?: string;
  subtitle?: string;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function HoursCard({ content, eyebrow, subtitle }: HoursCardProps) {
  const { headline, hours } = content;
  const days = Object.entries(hours);

  return (
    <section id="hours" className="section-y">
      <div className="page-container">
        {headline && (
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            {headline}
          </h2>
        )}
        <div className="max-w-lg mx-auto bg-card border border-border rounded-[var(--radius-lg)] p-8">
          {days.map(([day, value], i) => (
            <div
              key={day}
              className={`flex justify-between py-2 ${
                i < days.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-foreground font-medium">{day}</span>
              <span className="text-muted-foreground">
                {value === "closed"
                  ? "Closed"
                  : `${formatTime(value.open)} - ${formatTime(value.close)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
