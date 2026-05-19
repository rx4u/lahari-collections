"use client";

import { useState, useEffect } from "react";

interface CTACountdownProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    deadline: string;
    cta: { text: string; url: string };
  };
  eyebrow?: string;
  subtitle?: string;
}

function getTimeLeft(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CTACountdown({ content, eyebrow, subtitle }: CTACountdownProps) {
  const [time, setTime] = useState(getTimeLeft(content.deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft(content.deadline));
    }, 1000);
    return () => clearInterval(interval);
  }, [content.deadline]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section id="cta" className="section-y">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 text-muted-foreground">{content.description}</p>
        )}
        <div className="mt-8 flex justify-center gap-4">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center rounded-[var(--radius-lg)] border border-border bg-card px-4 py-3 md:px-6 md:py-4">
              <span className="text-2xl font-bold text-primary md:text-4xl">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">{u.label}</span>
            </div>
          ))}
        </div>
        <a
          href={content.cta.url}
          className="mt-8 inline-block rounded-[var(--radius-md)] bg-primary px-8 py-3 font-medium text-primary-foreground"
        >
          {content.cta.text}
        </a>
      </div>
    </section>
  );
}
