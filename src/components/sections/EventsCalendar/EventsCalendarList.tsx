import { Clock, MapPin } from "lucide-react";

interface EventsCalendarListProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  events: Array<{
      title: string;
      date: string;
      time?: string;
      location?: string;
      description?: string;
    eyebrow?: string;
    subtitle?: string;
    category?: string;
      cta?: { text: string; url: string };
      featured?: boolean;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

function DateBlock({ date }: { date: string }) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "short" }).toUpperCase();
  return (
    <div className="bg-primary text-primary-foreground rounded-[var(--radius-sm)] px-3 py-2 text-center shrink-0 w-14">
      <p className="text-xs leading-tight">{month}</p>
      <p className="text-2xl font-bold leading-tight">{day}</p>
    </div>
  );
}

export default function EventsCalendarList({ content, eyebrow, subtitle }: EventsCalendarListProps) {
  return (
    <section className="section-y">
      <div className="max-w-3xl mx-auto">
        {(content.headline || content.description) && (
          <div className="mb-10">
            {content.headline && (
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-2">
                {content.headline}
              </h2>
            )}
            {content.description && (
              <p className="text-muted-foreground text-base">{content.description}</p>
            )}
          </div>
        )}
        <div className="divide-y divide-border">
          {content.events.map((event, i) => (
            <div key={i} className="flex gap-4 py-5">
              <DateBlock date={event.date} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-foreground">{event.title}</p>
                  {event.category && (
                    <span className="shrink-0 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                      {event.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                  {event.time && (
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {event.time}
                    </span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {event.location}
                    </span>
                  )}
                </div>
                {event.description && (
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                )}
                {event.cta && (
                  <a
                    href={event.cta.url}
                    className="inline-block mt-2 text-sm text-primary font-medium hover:underline"
                  >
                    {event.cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
