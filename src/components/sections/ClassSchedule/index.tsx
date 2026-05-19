import ClassScheduleWeeklyTable from "./ClassScheduleWeeklyTable";
import ClassScheduleCardGrid from "./ClassScheduleCardGrid";
import ClassScheduleCalendarView from "./ClassScheduleCalendarView";

type ClassScheduleContent = {
  headline: string;
  description?: string;
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

export default function ClassSchedule({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as ClassScheduleContent };

  switch (variant) {
    case "weekly-table":
      return <ClassScheduleWeeklyTable {...props} />;
    case "card-grid":
      return <ClassScheduleCardGrid {...props} />;
    case "calendar-view":
      return <ClassScheduleCalendarView {...props} />;
    default:
      return <ClassScheduleWeeklyTable {...props} />;
  }
}
