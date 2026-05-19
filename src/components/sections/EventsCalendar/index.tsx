import EventsCalendarList from "./EventsCalendarList";
import EventsCalendarCardGrid from "./EventsCalendarCardGrid";
import EventsCalendarCalendar from "./EventsCalendarCalendar";

export default function EventsCalendar({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "card-grid": return <EventsCalendarCardGrid content={content as any} />;
    case "calendar": return <EventsCalendarCalendar content={content as any} />;
    case "list":
    default: return <EventsCalendarList content={content as any} />;
  }
}
