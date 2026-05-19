'use client';

import { useState, useCallback } from 'react';
import { useConfigStore } from '@/lib/config-store';
import { THEME_CATALOG, THEME_CATEGORIES, ThemeMeta } from '@/lib/theme-catalog';

function SwatchDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-4 w-4 rounded-full border border-black/10 flex-shrink-0"
      style={{ background: color }}
    />
  );
}

function ThemeCard({
  theme,
  active,
  onClick,
}: {
  theme: ThemeMeta;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border p-3 text-left transition-all hover:border-blue-400 ${
        active ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20' : 'border-zinc-200 bg-white hover:bg-zinc-50'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <SwatchDot color={theme.colors.primary} />
        <SwatchDot color={theme.colors.secondary} />
        <SwatchDot color={theme.colors.tertiary} />
        <SwatchDot color={theme.colors.neutral} />
      </div>
      <p className="text-xs font-semibold text-zinc-800 leading-tight">{theme.name}</p>
      <p className="text-[10px] text-zinc-400 mt-0.5">{theme.fonts.display}</p>
      <div className="flex flex-wrap gap-1 mt-1.5">
        {theme.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[9px] font-medium text-zinc-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

interface ThemePickerProps {
  onThemeChange?: (tokens: Record<string, string>) => void;
}

export function ThemePicker({ onThemeChange }: ThemePickerProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const currentTheme = useConfigStore((s) => s.theme.designMd);
  const setTheme = useConfigStore((s) => s.setTheme);

  const filtered = THEME_CATALOG.filter(
    (t) => activeCategory === 'All' || t.category === activeCategory
  );

  const handleSelect = useCallback(
    (theme: ThemeMeta) => {
      setTheme({ designMd: theme.id });
      onThemeChange?.(theme.tokens);
    },
    [setTheme, onThemeChange]
  );

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1">
        {THEME_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-zinc-800 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {filtered.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            active={theme.id === currentTheme}
            onClick={() => handleSelect(theme)}
          />
        ))}
      </div>
    </div>
  );
}
