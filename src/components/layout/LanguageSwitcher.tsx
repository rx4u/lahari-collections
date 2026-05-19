"use client";

import { useEffect, useState } from "react";
import { getLocaleLabel } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locales: string[];
}

export default function LanguageSwitcher({ locales }: LanguageSwitcherProps) {
  const [current, setCurrent] = useState(locales[0] ?? "en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored && locales.includes(stored)) setCurrent(stored);
  }, [locales]);

  if (locales.length <= 1) return null;

  function select(locale: string) {
    setCurrent(locale);
    localStorage.setItem("locale", locale);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.toUpperCase()}</span>
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-[var(--radius-md)] border border-border bg-background py-1 shadow-md"
        >
          {locales.map((locale) => (
            <li key={locale}>
              <button
                role="option"
                aria-selected={locale === current}
                onClick={() => select(locale)}
                className={`w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-muted ${
                  locale === current ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {getLocaleLabel(locale)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
