'use client';

import { useState } from 'react';
import { useConfigStore } from '@/lib/config-store';

const SECTION_VARIANTS: Record<string, string[]> = {
  services:     ['icon-grid', 'icon-list', 'card-carousel', 'detailed-accordion', 'tabbed', 'grid-4'],
  about:        ['story', 'split-content', 'split-image', 'timeline', 'stats-inline'],
  testimonials: ['carousel', 'simple-grid', 'grid', 'featured-quote', 'video-testimonial'],
  gallery:      ['grid-3', 'grid', 'masonry', 'before-after', 'fullwidth-carousel'],
  faq:          ['accordion', 'two-column', 'categorized'],
  contact:      ['split-map', 'split-info', 'minimal'],
  cta:          ['banner', 'split', 'floating-bar', 'countdown'],
  stats:        ['counter', 'icon-stat', 'progress-bar', 'comparison'],
  hours:        ['card', 'table', 'inline-banner'],
  location:     ['map-embed', 'multi-location', 'directions-card'],
  team:         ['grid', 'carousel', 'featured-single', 'minimal-list'],
  pricing:      ['cards-2', 'table', 'toggle-monthly-annual', 'simple-list'],
  trust:        ['logo-cloud', 'certifications', 'awards', 'media-mentions'],
  announcement: ['top-bar', 'inline-banner', 'modal'],
};

const DEFAULT_CONTENT: Record<string, Record<string, unknown>> = {
  services:     { headline: 'Our Services', items: [] },
  about:        { headline: 'About Us', body: 'Tell your story here.' },
  testimonials: { headline: 'What Clients Say', items: [] },
  gallery:      { headline: 'Gallery', images: [] },
  faq:          { headline: 'Frequently Asked Questions', items: [] },
  contact:      { headline: 'Contact Us' },
  cta:          { headline: 'Ready to get started?', ctaText: 'Contact Us', ctaUrl: '#contact' },
  stats:        { headline: 'Our Numbers', items: [] },
  hours:        { headline: 'Business Hours' },
  location:     { headline: 'Find Us' },
  team:         { headline: 'Meet the Team', members: [] },
  pricing:      { headline: 'Our Pricing', items: [] },
  trust:        { headline: 'Why Trust Us', items: [] },
  announcement: { headline: 'Announcement', message: '' },
};

const ALL_SECTION_TYPES = [
  'services', 'about', 'testimonials', 'gallery', 'faq',
  'contact', 'cta', 'stats', 'hours', 'location',
  'team', 'pricing', 'trust', 'announcement',
];

interface Props {
  selectedIndex: number | null;
  onSelect: (index: number | null) => void;
}

export function SectionManager({ selectedIndex, onSelect }: Props) {
  const sections = useConfigStore((s) => s.sections);
  const addSection = useConfigStore((s) => s.addSection);
  const removeSection = useConfigStore((s) => s.removeSection);
  const updateSectionVariant = useConfigStore((s) => s.updateSectionVariant);
  const reorderSections = useConfigStore((s) => s.reorderSections);

  const [showAddPanel, setShowAddPanel] = useState(false);

  const existingTypes = new Set(sections.map((s) => s.type));
  const availableToAdd = ALL_SECTION_TYPES.filter((t) => !existingTypes.has(t));

  const variantsFor = (type: string) =>
    SECTION_VARIANTS[type] ?? ['default'];

  return (
    <div className="space-y-1">
      {sections.length === 0 && (
        <p className="py-2 text-[11px] text-zinc-400">No sections added yet.</p>
      )}

      {sections.map((section, i) => (
        <div
          key={`${section.type}-${i}`}
          className={`rounded-md border px-2.5 py-2 text-xs ${
            selectedIndex === i
              ? 'border-blue-400 bg-blue-50'
              : 'border-zinc-200 bg-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {/* Reorder */}
            <div className="flex flex-col gap-0.5 shrink-0">
              <button
                disabled={i === 0}
                onClick={() => reorderSections(i, i - 1)}
                className="rounded px-0.5 text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
                title="Move up"
              >
                ▲
              </button>
              <button
                disabled={i === sections.length - 1}
                onClick={() => reorderSections(i, i + 1)}
                className="rounded px-0.5 text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
                title="Move down"
              >
                ▼
              </button>
            </div>

            {/* Type label */}
            <button
              className="flex-1 text-left font-medium capitalize text-zinc-700 hover:text-zinc-900"
              onClick={() => onSelect(selectedIndex === i ? null : i)}
            >
              {section.type}
            </button>

            {/* Variant selector */}
            <select
              value={section.variant}
              onChange={(e) => updateSectionVariant(i, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[11px] text-zinc-600 focus:border-blue-400 focus:outline-none"
            >
              {variantsFor(section.type).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Remove */}
            <button
              onClick={() => {
                if (selectedIndex === i) onSelect(null);
                removeSection(i);
              }}
              className="text-zinc-300 hover:text-red-400 transition-colors"
              title="Remove section"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {/* Add section */}
      <div className="pt-1">
        {!showAddPanel ? (
          <button
            onClick={() => setShowAddPanel(true)}
            className="w-full rounded-md border border-dashed border-zinc-300 py-1.5 text-[11px] text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-colors"
          >
            + Add section
          </button>
        ) : (
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-2">
            <p className="mb-1.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">
              Add section
            </p>
            {availableToAdd.length === 0 ? (
              <p className="text-[11px] text-zinc-400">All sections added.</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {availableToAdd.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      const firstVariant = SECTION_VARIANTS[type]?.[0] ?? 'default';
                      const defaultContent = DEFAULT_CONTENT[type] ?? {};
                      addSection({ type, variant: firstVariant, content: defaultContent });
                      setShowAddPanel(false);
                    }}
                    className="rounded bg-white border border-zinc-200 px-2 py-0.5 text-[11px] capitalize text-zinc-600 hover:border-zinc-400 hover:text-zinc-800 transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowAddPanel(false)}
              className="mt-2 text-[11px] text-zinc-400 hover:text-zinc-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
