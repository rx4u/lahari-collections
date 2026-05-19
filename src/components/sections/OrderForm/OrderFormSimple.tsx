"use client";

import { useState } from "react";

interface OrderFormSimpleProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      name: string;
      price: string;
    }>;
    submitText?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function OrderFormSimple({ content, eyebrow, subtitle }: OrderFormSimpleProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section id="order-form" className="section-y">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-[var(--radius-md)] border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-[var(--radius-md)] border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Select Items</p>
            <div className="space-y-2">
              {content.items.map((item, index) => (
                <label
                  key={index}
                  className="flex cursor-pointer items-center justify-between rounded-[var(--radius-md)] border border-border bg-card px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selected.has(index)}
                      onChange={() => toggle(index)}
                      className="size-4 rounded border-border text-primary"
                    />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-primary">{item.price}</span>
                </label>
              ))}
            </div>
          </div>
          <input
            type="number"
            placeholder="Quantity"
            min={1}
            className="w-full rounded-[var(--radius-md)] border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <input
            type="date"
            className="w-full rounded-[var(--radius-md)] border border-border bg-card px-4 py-2.5 text-sm text-foreground"
          />
          <textarea
            placeholder="Special Instructions"
            rows={3}
            className="w-full rounded-[var(--radius-md)] border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="w-full rounded-[var(--radius-md)] bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {content.submitText ?? "Place Order"}
          </button>
        </form>
      </div>
    </section>
  );
}
