'use client';

import { useConfigStore } from '@/lib/config-store';

export function BusinessSetup() {
  const business = useConfigStore((s) => s.business);
  const setBusiness = useConfigStore((s) => s.setBusiness);

  const inputCls =
    'w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400';
  const labelCls = 'block mb-0.5 text-[11px] font-medium text-zinc-500';

  return (
    <div className="space-y-4">
      {/* Core info */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Core Info
        </p>

        <div>
          <label className={labelCls}>Business Name</label>
          <input
            type="text"
            value={business.name}
            placeholder="My Business"
            className={inputCls}
            onChange={(e) => setBusiness({ name: e.target.value })}
          />
        </div>

        <div>
          <label className={labelCls}>Tagline</label>
          <input
            type="text"
            value={business.tagline}
            placeholder="Your trusted partner"
            className={inputCls}
            onChange={(e) => setBusiness({ tagline: e.target.value })}
          />
        </div>

        <div>
          <label className={labelCls}>Phone</label>
          <input
            type="text"
            value={business.phone}
            placeholder="+91 98765 43210"
            className={inputCls}
            onChange={(e) => setBusiness({ phone: e.target.value })}
          />
        </div>

        <div>
          <label className={labelCls}>Email</label>
          <input
            type="text"
            value={business.email}
            placeholder="hello@mybusiness.com"
            className={inputCls}
            onChange={(e) => setBusiness({ email: e.target.value })}
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Address
        </p>

        <div>
          <label className={labelCls}>Street Address</label>
          <input
            type="text"
            value={business.address}
            placeholder="123 Main Street"
            className={inputCls}
            onChange={(e) => setBusiness({ address: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelCls}>City</label>
            <input
              type="text"
              value={business.city}
              placeholder="Chennai"
              className={inputCls}
              onChange={(e) => setBusiness({ city: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>State</label>
            <input
              type="text"
              value={business.state}
              placeholder="Tamil Nadu"
              className={inputCls}
              onChange={(e) => setBusiness({ state: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Pincode</label>
          <input
            type="text"
            value={business.pincode}
            placeholder="600001"
            className={inputCls}
            onChange={(e) => setBusiness({ pincode: e.target.value })}
          />
        </div>
      </div>

      {/* Social links */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Social Links
        </p>

        <div>
          <label className={labelCls}>Instagram</label>
          <input
            type="text"
            value={((business as unknown) as Record<string, unknown>).instagram as string ?? ''}
            placeholder="https://instagram.com/yourbusiness"
            className={inputCls}
            onChange={(e) => setBusiness(({ instagram: e.target.value } as unknown) as Parameters<typeof setBusiness>[0])}
          />
        </div>

        <div>
          <label className={labelCls}>Facebook</label>
          <input
            type="text"
            value={((business as unknown) as Record<string, unknown>).facebook as string ?? ''}
            placeholder="https://facebook.com/yourbusiness"
            className={inputCls}
            onChange={(e) => setBusiness(({ facebook: e.target.value } as unknown) as Parameters<typeof setBusiness>[0])}
          />
        </div>

        <div>
          <label className={labelCls}>WhatsApp</label>
          <input
            type="text"
            value={((business as unknown) as Record<string, unknown>).whatsapp as string ?? ''}
            placeholder="+91 98765 43210"
            className={inputCls}
            onChange={(e) => setBusiness(({ whatsapp: e.target.value } as unknown) as Parameters<typeof setBusiness>[0])}
          />
        </div>
      </div>
    </div>
  );
}
