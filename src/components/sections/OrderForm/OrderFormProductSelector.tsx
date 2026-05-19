"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
};

type OrderFormProductSelectorContent = {
  headline?: string;
  products?: Product[];
  currency?: string;
  submitLabel?: string;
};

export default function OrderFormProductSelector({
  content,
  eyebrow,
  subtitle,
}: {
  content: OrderFormProductSelectorContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const {
    headline = "Place Your Order",
    products = [],
    currency = "₹",
    submitLabel = "Place Order",
  } = content;

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (!quantities[id]) setQuantities((q) => ({ ...q, [id]: 1 }));
      }
      return next;
    });
  }

  function changeQty(id: string, delta: number) {
    setQuantities((q) => {
      const next = Math.max(1, (q[id] ?? 1) + delta);
      return { ...q, [id]: next };
    });
  }

  const selectedProducts = products.filter((p) => selected.has(p.id));
  const total = selectedProducts.reduce(
    (sum, p) => sum + p.price * (quantities[p.id] ?? 1),
    0
  );

  return (
    <section className="section-y">
      <div className="page-container">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-[family-name:var(--font-display)]">
          {headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Product grid */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 font-[family-name:var(--font-body)]">
              Select items
            </p>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => {
                const isSelected = selected.has(product.id);
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => toggle(product.id)}
                    className={`text-left border rounded-[var(--radius-sm)] p-3 transition-all ${
                      isSelected
                        ? "ring-2 ring-primary border-primary/30 bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground font-[family-name:var(--font-body)]">
                      {product.name}
                    </p>
                    {product.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 mb-1 font-[family-name:var(--font-body)]">
                        {product.description}
                      </p>
                    )}
                    <p className="text-sm font-bold text-primary font-[family-name:var(--font-body)]">
                      {currency}{product.price.toLocaleString("en-IN")}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Summary + form */}
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 font-[family-name:var(--font-body)]">
              Order summary
            </p>

            {selectedProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground mb-4 font-[family-name:var(--font-body)]">
                No items selected yet.
              </p>
            ) : (
              <div className="space-y-3 mb-4">
                {selectedProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2">
                    <span className="text-sm text-foreground flex-1 font-[family-name:var(--font-body)]">
                      {p.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => changeQty(p.id, -1)}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded text-muted-foreground hover:text-foreground"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                        {quantities[p.id] ?? 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeQty(p.id, 1)}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded text-muted-foreground hover:text-foreground"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-foreground w-20 text-right font-[family-name:var(--font-body)]">
                      {currency}{(p.price * (quantities[p.id] ?? 1)).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-sm font-bold text-foreground font-[family-name:var(--font-body)]">Total</span>
                  <span className="text-sm font-bold text-primary font-[family-name:var(--font-body)]">
                    {currency}{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3 mb-5">
              <input type="text" placeholder="Your name" className="w-full border border-border rounded-[var(--radius-sm)] px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 ring-primary text-foreground font-[family-name:var(--font-body)]" />
              <input type="tel" placeholder="Phone number" className="w-full border border-border rounded-[var(--radius-sm)] px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 ring-primary text-foreground font-[family-name:var(--font-body)]" />
              <textarea placeholder="Delivery address" rows={2} className="w-full border border-border rounded-[var(--radius-sm)] px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 ring-primary text-foreground resize-none font-[family-name:var(--font-body)]" />
              <textarea placeholder="Notes (optional)" rows={2} className="w-full border border-border rounded-[var(--radius-sm)] px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 ring-primary text-foreground resize-none font-[family-name:var(--font-body)]" />
            </div>

            <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-[var(--radius-sm)] text-sm hover:opacity-90 transition-opacity font-[family-name:var(--font-body)]">
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
