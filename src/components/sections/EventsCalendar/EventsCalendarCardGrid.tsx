import { Clock, MapPin } from "lucide-react";

interface EventsCalendarCardGridProps {
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" });
}

export default function EventsCalendarCardGrid({ content, eyebrow, subtitle }: EventsCalendarCardGridProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.events.map((event, i) => (
            <div
              key={i}
              className={`bg-card border rounded-[var(--radius-md)] p-5 flex flex-col ${
                event.featured ? "border-primary border-2" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                {event.category ? (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {event.category}
                  </span>
                ) : <span />}
                <p className="text-sm text-muted-foreground text-right">{formatDate(event.date)}</p>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mt-2 leading-snug">
                {event.title}
              </h3>
              {event.description && (
                <p className="text-sm text-muted-foreground mt-1 flex-1">{event.description}</p>
              )}
              <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {event.time && (
                    <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                  )}
                  {event.location && (
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                  )}
                </div>
                {event.cta && (
                  <a
                    href={event.cta.url}
                    className="text-xs font-medium text-primary hover:underline"
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
