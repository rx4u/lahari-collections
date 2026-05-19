'use client';

import { useConfigStore } from '@/lib/config-store';

interface HeroVariant {
  id: string;
  label: string;
  description: string;
  preview: React.ReactNode;
}

function WireframeCentered() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-full" fill="none">
      <rect width="120" height="70" fill="#f4f4f5" />
      <rect x="40" y="12" width="40" height="6" rx="2" fill="#d4d4d8" />
      <rect x="30" y="22" width="60" height="4" rx="1.5" fill="#e4e4e7" />
      <rect x="45" y="32" width="30" height="4" rx="1.5" fill="#e4e4e7" />
      <rect x="44" y="42" width="32" height="10" rx="3" fill="#a1a1aa" />
    </svg>
  );
}

function WireframeSplitImage() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-full" fill="none">
      <rect width="120" height="70" fill="#f4f4f5" />
      <rect x="0" y="0" width="60" height="70" fill="#e4e4e7" />
      <rect x="66" y="16" width="44" height="5" rx="2" fill="#d4d4d8" />
      <rect x="66" y="25" width="36" height="3" rx="1.5" fill="#e4e4e7" />
      <rect x="66" y="31" width="28" height="3" rx="1.5" fill="#e4e4e7" />
      <rect x="66" y="42" width="28" height="8" rx="2.5" fill="#a1a1aa" />
    </svg>
  );
}

function WireframeImageBg() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-full" fill="none">
      <rect width="120" height="70" fill="#d4d4d8" />
      <rect width="120" height="70" fill="black" fillOpacity="0.35" />
      <rect x="30" y="14" width="60" height="6" rx="2" fill="white" fillOpacity="0.8" />
      <rect x="35" y="24" width="50" height="4" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="40" y="34" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="44" y="44" width="32" height="10" rx="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function WireframeGradient() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="120" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="120" height="70" fill="url(#grad)" />
      <rect x="30" y="14" width="60" height="6" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="35" y="24" width="50" height="4" rx="1.5" fill="white" fillOpacity="0.6" />
      <rect x="40" y="34" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
      <rect x="44" y="44" width="32" height="10" rx="3" fill="white" fillOpacity="0.85" />
    </svg>
  );
}

function WireframeMinimal() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-full" fill="none">
      <rect width="120" height="70" fill="#fafafa" />
      <rect x="10" y="18" width="70" height="8" rx="2" fill="#d4d4d8" />
      <rect x="10" y="30" width="55" height="4" rx="1.5" fill="#e4e4e7" />
      <rect x="10" y="37" width="45" height="4" rx="1.5" fill="#e4e4e7" />
      <rect x="10" y="48" width="24" height="9" rx="2.5" fill="#a1a1aa" />
      <rect x="80" y="8" width="32" height="54" rx="4" fill="#e4e4e7" />
    </svg>
  );
}

function WireframeVideoBg() {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-full" fill="none">
      <rect width="120" height="70" fill="#18181b" />
      <circle cx="60" cy="35" r="14" fill="#27272a" stroke="#52525b" strokeWidth="1" />
      <polygon points="55,28 55,42 69,35" fill="#a1a1aa" />
      <rect x="30" y="56" width="60" height="4" rx="1.5" fill="#52525b" />
    </svg>
  );
}

const HERO_VARIANTS: HeroVariant[] = [
  {
    id: 'centered',
    label: 'Centered',
    description: 'Headline + CTA centered on solid background',
    preview: <WireframeCentered />,
  },
  {
    id: 'split-image',
    label: 'Split Image',
    description: 'Text left, image right',
    preview: <WireframeSplitImage />,
  },
  {
    id: 'image-bg',
    label: 'Image Background',
    description: 'Full-screen image with overlay text',
    preview: <WireframeImageBg />,
  },
  {
    id: 'gradient',
    label: 'Gradient',
    description: 'Vibrant gradient fill background',
    preview: <WireframeGradient />,
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Left-aligned text with small image',
    preview: <WireframeMinimal />,
  },
  {
    id: 'video-bg',
    label: 'Video Background',
    description: 'Looping video with overlay',
    preview: <WireframeVideoBg />,
  },
];

export function HeroStylePicker() {
  const currentStyle = useConfigStore((s) => s.hero.style);
  const setHeroStyle = useConfigStore((s) => s.setHeroStyle);

  return (
    <div className="grid grid-cols-2 gap-2">
      {HERO_VARIANTS.map((variant) => (
        <button
          key={variant.id}
          onClick={() => setHeroStyle(variant.id)}
          className={`rounded-lg border overflow-hidden text-left transition-all ${
            currentStyle === variant.id
              ? 'border-blue-500 ring-2 ring-blue-500/20'
              : 'border-zinc-200 hover:border-zinc-400'
          }`}
        >
          <div className="aspect-[16/9] bg-zinc-100">{variant.preview}</div>
          <div className="px-2 py-1.5">
            <p className="text-[11px] font-semibold text-zinc-800">{variant.label}</p>
            <p className="text-[9px] text-zinc-400 leading-tight mt-0.5">{variant.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
