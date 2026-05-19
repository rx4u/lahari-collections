'use client';

import { useConfigStore } from '@/lib/config-store';
import { HeroStylePicker } from '@/components/HeroStylePicker';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function HeroPanel() {
  const hero = useConfigStore((s) => s.hero);
  const setHeroContent = useConfigStore((s) => s.setHeroContent);

  return (
    <div>
      <HeroStylePicker />

      <Separator className="my-2" />

      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-3 pt-3 pb-2">
        Copy
      </p>

      <div className="px-3 pb-3 space-y-3">
        <div>
          <Label className="text-[11px] font-medium text-zinc-600 mb-1 block">
            Headline
          </Label>
          <Input
            value={hero.headline}
            onChange={(e) => setHeroContent({ headline: e.target.value })}
            placeholder="Main headline"
          />
        </div>

        <div>
          <Label className="text-[11px] font-medium text-zinc-600 mb-1 block">
            Subheadline
          </Label>
          <Textarea
            rows={3}
            value={hero.subheadline}
            onChange={(e) => setHeroContent({ subheadline: e.target.value })}
            placeholder="Supporting text"
          />
        </div>

        <div>
          <Label className="text-[11px] font-medium text-zinc-600 mb-1 block">
            CTA Text
          </Label>
          <Input
            value={hero.cta?.text ?? ''}
            onChange={(e) =>
              setHeroContent({
                cta: { ...hero.cta, text: e.target.value, url: hero.cta?.url ?? '#contact' },
              })
            }
            placeholder="Button label"
          />
        </div>

        <div>
          <Label className="text-[11px] font-medium text-zinc-600 mb-1 block">
            CTA URL
          </Label>
          <Input
            value={hero.cta?.url ?? ''}
            onChange={(e) =>
              setHeroContent({
                cta: { ...hero.cta, url: e.target.value, text: hero.cta?.text ?? '' },
              })
            }
            placeholder="#contact"
          />
        </div>
      </div>
    </div>
  );
}
