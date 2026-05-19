'use client';

import { useState, useCallback } from 'react';
import { useConfigStore } from '@/lib/config-store';

interface ColorPickerProps {
  onAccentChange?: (color: string | undefined) => void;
}

const PRESET_ACCENTS = [
  { label: 'Sea Green', value: 'oklch(0.52 0.12 152)' },
  { label: 'Blue', value: 'oklch(0.55 0.18 250)' },
  { label: 'Violet', value: 'oklch(0.55 0.2 290)' },
  { label: 'Rose', value: 'oklch(0.6 0.2 10)' },
  { label: 'Amber', value: 'oklch(0.7 0.18 75)' },
  { label: 'Teal', value: 'oklch(0.55 0.14 195)' },
  { label: 'Crimson', value: 'oklch(0.5 0.22 25)' },
  { label: 'Slate', value: 'oklch(0.45 0.04 255)' },
];

export function ColorPicker({ onAccentChange }: ColorPickerProps) {
  const accentColor = useConfigStore((s) => s.theme.accentColor);
  const setAccentColor = useConfigStore((s) => s.setAccentColor);
  const [inputValue, setInputValue] = useState(accentColor ?? '');

  const apply = useCallback(
    (color: string | undefined) => {
      setAccentColor(color);
      onAccentChange?.(color);
    },
    [setAccentColor, onAccentChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val.trim()) apply(val.trim());
  };

  const reset = () => {
    setInputValue('');
    apply(undefined);
  };

  return (
    <div>
      <p className="mb-2 text-[10px] text-zinc-400">Accent overrides tertiary/CTA color</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {PRESET_ACCENTS.map((preset) => (
          <button
            key={preset.value}
            title={preset.label}
            onClick={() => {
              setInputValue(preset.value);
              apply(preset.value);
            }}
            className={`h-7 w-7 rounded-full border-2 transition-all ${
              accentColor === preset.value ? 'border-zinc-800 scale-110' : 'border-white shadow-sm hover:scale-105'
            }`}
            style={{ background: preset.value }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="oklch(0.52 0.12 152)"
          className="flex-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] text-zinc-800 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        {accentColor && (
          <button
            onClick={reset}
            className="rounded-md border border-zinc-200 px-2 py-1.5 text-[10px] text-zinc-500 hover:bg-zinc-50 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {accentColor && (
        <div className="mt-2 flex items-center gap-2 rounded-md bg-zinc-50 px-2.5 py-2">
          <span
            className="h-4 w-4 rounded-full border border-black/10 flex-shrink-0"
            style={{ background: accentColor }}
          />
          <span className="text-[10px] text-zinc-500 font-mono truncate">{accentColor}</span>
        </div>
      )}
    </div>
  );
}
