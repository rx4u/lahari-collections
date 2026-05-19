"use client";

import { CartProvider as CartContextProvider } from "@/lib/cart-context";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
