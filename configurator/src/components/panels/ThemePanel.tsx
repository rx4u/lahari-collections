'use client';

import { ThemePicker } from '@/components/ThemePicker';
import { ColorPicker } from '@/components/ColorPicker';
import { Separator } from '@/components/ui/separator';

interface ThemePanelProps {
  onThemeChange: (tokens: Record<string, string>) => void;
  onAccentChange: (color: string | undefined) => void;
}

export function ThemePanel({ onThemeChange, onAccentChange }: ThemePanelProps) {
  return (
    <div>
      <div className="px-3 py-3">
        <ThemePicker onThemeChange={onThemeChange} />
      </div>

      <Separator />

      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-3 pt-3 pb-1">
        Accent Color
      </p>

      <div className="px-3 pb-3">
        <ColorPicker onAccentChange={onAccentChange} />
      </div>
    </div>
  );
}
