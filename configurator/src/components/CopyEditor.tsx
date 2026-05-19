'use client';

import { useRef, useState } from 'react';
import { useConfigStore } from '@/lib/config-store';

interface Props {
  sectionIndex: number;
  onClose: () => void;
}

const ITEMS_SECTIONS = ['services', 'team', 'pricing'];

export function CopyEditor({ sectionIndex, onClose }: Props) {
  const section = useConfigStore((s) => s.sections[sectionIndex]);
  const updateSectionContent = useConfigStore((s) => s.updateSectionContent);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Local state mirrors section.content for controlled inputs
  const [headline, setHeadline] = useState(
    (section?.content?.headline as string) ?? ''
  );
  const [description, setDescription] = useState(
    (section?.content?.description as string) ?? ''
  );
  const [ctaText, setCtaText] = useState(
    (section?.content?.ctaText as string) ?? ''
  );
  const [ctaUrl, setCtaUrl] = useState(
    (section?.content?.ctaUrl as string) ?? ''
  );
  const [email, setEmail] = useState(
    (section?.content?.email as string) ?? ''
  );
  const [phone, setPhone] = useState(
    (section?.content?.phone as string) ?? ''
  );

  const scheduleUpdate = (patch: Record<string, string>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateSectionContent(sectionIndex, patch);
    }, 400);
  };

  if (!section) return null;

  const inputCls =
    'w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400';
  const labelCls = 'block mb-0.5 text-[11px] font-medium text-zinc-500';

  return (
    <div className="mt-2 rounded-md border border-blue-200 bg-blue-50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold capitalize text-zinc-700">
          Edit: {section.type}
        </span>
        <button
          onClick={onClose}
          className="text-[11px] text-zinc-400 hover:text-zinc-700"
        >
          Close
        </button>
      </div>

      <div className="space-y-2.5">
        {/* Always: headline */}
        <div>
          <label className={labelCls}>Headline</label>
          <input
            type="text"
            value={headline}
            placeholder="Section headline"
            className={inputCls}
            onChange={(e) => {
              setHeadline(e.target.value);
              scheduleUpdate({ headline: e.target.value });
            }}
          />
        </div>

        {/* Always: description */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            value={description}
            placeholder="Short description"
            rows={3}
            className={`${inputCls} resize-none`}
            onChange={(e) => {
              setDescription(e.target.value);
              scheduleUpdate({ description: e.target.value });
            }}
          />
        </div>

        {/* Items count (read-only) for services / team / pricing */}
        {ITEMS_SECTIONS.includes(section.type) && (
          <div>
            <label className={labelCls}>Items</label>
            <p className="text-[11px] text-zinc-400">
              {Array.isArray(section.content?.items)
                ? (section.content.items as unknown[]).length
                : 0}{' '}
              item(s) — edit in site.config.ts
            </p>
          </div>
        )}

        {/* CTA fields */}
        {section.type === 'cta' && (
          <>
            <div>
              <label className={labelCls}>CTA Text</label>
              <input
                type="text"
                value={ctaText}
                placeholder="Button label"
                className={inputCls}
                onChange={(e) => {
                  setCtaText(e.target.value);
                  scheduleUpdate({ ctaText: e.target.value });
                }}
              />
            </div>
            <div>
              <label className={labelCls}>CTA URL</label>
              <input
                type="text"
                value={ctaUrl}
                placeholder="#contact"
                className={inputCls}
                onChange={(e) => {
                  setCtaUrl(e.target.value);
                  scheduleUpdate({ ctaUrl: e.target.value });
                }}
              />
            </div>
          </>
        )}

        {/* Contact fields */}
        {section.type === 'contact' && (
          <>
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="text"
                value={email}
                placeholder="contact@example.com"
                className={inputCls}
                onChange={(e) => {
                  setEmail(e.target.value);
                  scheduleUpdate({ email: e.target.value });
                }}
              />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input
                type="text"
                value={phone}
                placeholder="+91 98765 43210"
                className={inputCls}
                onChange={(e) => {
                  setPhone(e.target.value);
                  scheduleUpdate({ phone: e.target.value });
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
