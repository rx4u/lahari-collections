"use client";

import type { ProductVariant } from "@/lib/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export default function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant.name}>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {variant.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selected[variant.name] === option;
              return (
                <button
                  key={option}
                  onClick={() => onChange(variant.name, option)}
                  className={`rounded-[var(--radius-md)] border px-3 py-1.5 text-sm transition-colors ${
                    isSelected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "border-[var(--color-neutral)]/20 text-foreground hover:border-[var(--color-primary)]/50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
