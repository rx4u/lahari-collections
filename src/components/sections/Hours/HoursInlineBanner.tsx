'use client';

import { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface HoursEntry {
  open: string;
  close: string;
}

interface HoursInlineBannerProps {
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

export default function HoursInlineBanner({ content, eyebrow, subtitle }: HoursInlineBannerProps) {
  const { hours } = content;
  const [expanded, setExpanded] = useState(false);
  const [todayLabel, setTodayLabel] = useState('');
  const [todayIndex, setTodayIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const idx = now.getDay() === 0 ? 6 : now.getDay() - 1;
    setTodayIndex(idx);
    const key = DAYS[idx];
    const entry = hours[key];
    if (!entry || entry === 'closed') {
      setTodayLabel('Closed today');
      setIsOpen(false);
    } else {
      setTodayLabel(`Open today: ${entry.open} – ${entry.close}`);
      const mins = now.getHours() * 60 + now.getMinutes();
      setIsOpen(mins >= parseTime(entry.open) && mins < parseTime(entry.close));
    }
  }, [hours]);

  return (
    <div className="w-full bg-muted border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-foreground">{todayLabel}</span>
            {todayLabel && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: isOpen ? 'var(--color-success-soft)' : 'var(--color-danger-soft)',
                  color: isOpen ? 'var(--color-success)' : 'var(--color-danger)',
                }}
              >
                {isOpen ? 'Open' : 'Closed'}
              </span>
            )}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? 'Hide hours' : 'All hours'}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1.5 pb-1">
            {DAYS.map((day, i) => {
              const entry = hours[day];
              const isToday = i === todayIndex;
              return (
                <div key={day} className={`flex justify-between text-xs gap-3 ${isToday ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                  <span className="capitalize">{day.slice(0, 3)}</span>
                  <span>{entry === 'closed' ? 'Closed' : `${entry.open}–${entry.close}`}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
