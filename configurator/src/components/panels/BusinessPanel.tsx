'use client';

import { useConfigStore } from '@/lib/config-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const BUSINESS_TYPES = [
  'doctor', 'dentist', 'restaurant', 'salon', 'gym', 'realestate', 'lawyer',
  'retail', 'hospital', 'vet', 'bakery', 'pharmacy', 'school', 'hotel',
  'events', 'wedding', 'homeservice', 'auto', 'photographer', 'interiors',
  'individual', 'nonprofit', 'worship', 'petshop', 'jewellery', 'printing',
  'catering', 'wellness', 'diagnostics', 'construction', 'local',
] as const;

const labelClass = 'text-[11px] font-medium text-zinc-600 mb-1 block';
const groupLabel = 'text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mt-2';

export function BusinessPanel() {
  const business = useConfigStore((s) => s.business);
  const setBusinessType = useConfigStore((s) => s.setBusinessType);
  const setBusiness = useConfigStore((s) => s.setBusiness);

  return (
    <div className="px-3 py-3 space-y-4">
      {/* Identity */}
      <div className="space-y-3">
        <div>
          <Label className={labelClass}>Business Type</Label>
          <Select value={business.type} onValueChange={(v) => v != null && setBusinessType(v)}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((t) => (
                <SelectItem key={t} value={t} className="text-xs">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className={labelClass}>Business Name</Label>
          <Input
            value={business.name}
            onChange={(e) => setBusiness({ name: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        <div>
          <Label className={labelClass}>Tagline</Label>
          <Input
            value={business.tagline}
            onChange={(e) => setBusiness({ tagline: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        <div>
          <Label className={labelClass}>Description</Label>
          <Textarea
            rows={3}
            value={business.description}
            onChange={(e) => setBusiness({ description: e.target.value })}
            className="text-xs resize-none"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-3">
        <p className={groupLabel}>Contact</p>

        <div>
          <Label className={labelClass}>Phone</Label>
          <Input
            type="tel"
            value={business.phone}
            onChange={(e) => setBusiness({ phone: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        <div>
          <Label className={labelClass}>Email</Label>
          <Input
            type="email"
            value={business.email}
            onChange={(e) => setBusiness({ email: e.target.value })}
            className="h-8 text-xs"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <p className={groupLabel}>Location</p>

        <div>
          <Label className={labelClass}>Address</Label>
          <Input
            value={business.address}
            onChange={(e) => setBusiness({ address: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className={labelClass}>City</Label>
            <Input
              value={business.city}
              onChange={(e) => setBusiness({ city: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <Label className={labelClass}>State</Label>
            <Input
              value={business.state}
              onChange={(e) => setBusiness({ state: e.target.value })}
              className="h-8 text-xs"
            />
          </div>
        </div>

        <div>
          <Label className={labelClass}>Pincode</Label>
          <Input
            value={business.pincode}
            onChange={(e) => setBusiness({ pincode: e.target.value })}
            className="h-8 text-xs"
          />
        </div>
      </div>
    </div>
  );
}
