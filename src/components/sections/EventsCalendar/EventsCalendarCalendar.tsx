"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

interface CalendarEvent {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  category?: string;
  cta?: { text: string; url: string };
  featured?: boolean;
}

interface EventsCalendarCalendarProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    events: CalendarEvent[];
  };
  eyebrow?: string;
  subtitle?: string;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function EventsCalendarCalendar({ content, eyebrow, subtitle }: EventsCalendarCalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventDates = content.events.map((e) => new Date(e.date));

  function eventsForDay(day: Date) {
    return content.events.filter((e) => isSameDay(new Date(e.date), day));
  }

  const selectedEvents = selectedDate ? eventsForDay(selectedDate) : [];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <section className="section-y">
      <div className="page-container">
        {(content.headline || content.description) && (
          <div className="text-center mb-10">
            {content.headline && (
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-2">
                {content.headline}
              </h2>
            )}
            {content.description && (
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">{content.description}</p>
            )}
          </div>
        )}

        <div className="max-w-md mx-auto bg-card border border-border rounded-[var(--radius-md)] p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="p-1 rounded hover:bg-muted transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="font-semibold text-foreground">
              {viewDate.toLocaleString("default", { month: "long", year: "numeric" })}
            </p>
            <button
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="p-1 rounded hover:bg-muted transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center mb-1">
            {DAY_LABELS.map((d) => (
              <div key={d} className="text-xs text-muted-foreground font-medium py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              if (!day) return <div key={idx} />;
              const cellDate = new Date(year, month, day);
              const hasEvents = eventDates.some((e) => isSameDay(e, cellDate));
              const isSelected = selectedDate ? isSameDay(selectedDate, cellDate) : false;
              const isToday = isSameDay(cellDate, today);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(isSelected ? null : cellDate)}
                  className={`flex flex-col items-center justify-center py-1.5 rounded-[var(--radius-sm)] transition-colors text-sm ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isToday
                      ? "bg-muted font-semibold"
                      : "hover:bg-muted"
                  } ${hasEvents && !isSelected ? "text-primary font-semibold" : ""}`}
                >
                  {day}
                  {hasEvents && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? "bg-primary-foreground" : "bg-primary"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedEvents.length > 0 && (
          <div className="max-w-md mx-auto mt-4 space-y-3">
            {selectedEvents.map((event, i) => (
              <div key={i} className="bg-card border border-border rounded-[var(--radius-md)] p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-semibold text-foreground">{event.title}</p>
                  {event.category && <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{event.category}</span>}
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {event.time && <span className="flex items-center gap-1"><Clock size={11} /> {event.time}</span>}
                  {event.location && <span className="flex items-center gap-1"><MapPin size={11} /> {event.location}</span>}
                </div>
                {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                {event.cta && <a href={event.cta.url} className="text-xs text-primary font-medium hover:underline mt-1 inline-block">{event.cta.text}</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
