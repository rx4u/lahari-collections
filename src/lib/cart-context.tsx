"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { CartItem } from "./types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, variants?: Record<string, string>) => void;
  updateQuantity: (slug: string, quantity: number, variants?: Record<string, string>) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "template-hub-cart";

function getItemKey(slug: string, variants?: Record<string, string>): string {
  if (!variants || Object.keys(variants).length === 0) return slug;
  const sorted = Object.entries(variants).sort(([a], [b]) => a.localeCompare(b));
  return `${slug}::${sorted.map(([k, v]) => `${k}=${v}`).join(",")}`;
}

function matchesItem(item: CartItem, slug: string, variants?: Record<string, string>): boolean {
  return getItemKey(item.slug, item.selectedVariants) === getItemKey(slug, variants);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => matchesItem(i, item.slug, item.selectedVariants));
      if (existing) {
        return prev.map((i) =>
          matchesItem(i, item.slug, item.selectedVariants)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((slug: string, variants?: Record<string, string>) => {
    setItems((prev) => prev.filter((i) => !matchesItem(i, slug, variants)));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, quantity: number, variants?: Record<string, string>) => {
      if (quantity <= 0) {
        removeItem(slug, variants);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (matchesItem(i, slug, variants) ? { ...i, quantity } : i))
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
