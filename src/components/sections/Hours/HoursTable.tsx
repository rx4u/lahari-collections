'use client';

import { useEffect, useState } from 'react';

interface HoursEntry {
  open: string;
  close: string;
}

interface HoursTableProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    hours: Record<string, HoursEntry | 'closed'>;
  };
  eyebrow?: string;
  subtitle?: string;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function parseTime(t: string): number {
  const [h, m] = t.replace(/am|pm/i, '').split(':').map(Number);
  const isPm = /pm/i.test(t);
  return (isPm && h !== 12 ? h + 12 : !isPm && h === 12 ? 0 : h) * 60 + (m || 0);
}

export default function HoursTable({ content, eyebrow, subtitle }: HoursTableProps) {
  const { headline, hours } = content;
  const [todayIndex, setTodayIndex] = useState<number>(-1);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    const idx = now.getDay() === 0 ? 6 : now.getDay() - 1;
    setTodayIndex(idx);

    const todayKey = DAYS[idx];
    const entry = hours[todayKey];
    if (entry && entry !== 'closed') {
      const mins = now.getHours() * 60 + now.getMinutes();
      setIsOpenNow(mins >= parseTime(entry.open) && mins < parseTime(entry.close));
    }
  }, [hours]);

  return (
    <section className="section-y px-4">
      <div className="max-w-md mx-auto">
        {headline && (
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-foreground text-center mb-2">
            {headline}
          </h2>
        )}
        <div className="flex justify-center mb-6">
          {todayIndex >= 0 && (
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: isOpenNow ? 'var(--color-success-soft)' : 'var(--color-danger-soft)',
                color: isOpenNow ? 'var(--color-success)' : 'var(--color-danger)',
              }}
            >
              {isOpenNow ? 'Open Now' : 'Closed Now'}
            </span>
          )}
        </div>
        <div className="bg-card border border-border rounded-[var(--radius-md)] overflow-hidden">
          {DAYS.map((day, i) => {
            const entry = hours[day];
            const isToday = i === todayIndex;
            return (
              <div
                key={day}
                className={`flex justify-between items-center px-5 py-3 ${
                  i < DAYS.length - 1 ? 'border-b border-border' : ''
                } ${isToday ? 'bg-primary/10 font-medium' : ''}`}
              >
                <span className="capitalize text-foreground text-sm">
                  {day.slice(0, 3)}
                </span>
                {entry === 'closed' ? (
                  <span className="text-muted-foreground text-sm">Closed</span>
                ) : (
                  <span className="text-foreground text-sm">
                    {entry.open} – {entry.close}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
