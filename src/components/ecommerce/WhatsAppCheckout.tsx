"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface WhatsAppCheckoutProps {
  whatsappNumber: string;
  currencySymbol: string;
}

export default function WhatsAppCheckout({ whatsappNumber, currencySymbol }: WhatsAppCheckoutProps) {
  const { items, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");

  function buildMessage(): string {
    const lines = items.map((item, i) => {
      const variantStr = item.selectedVariants
        ? ` (${Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(", ")})`
        : "";
      const lineTotal = item.price * item.quantity;
      return `${i + 1}. ${item.name}${variantStr} x ${item.quantity} — ${currencySymbol} ${lineTotal.toLocaleString("en-IN")}`;
    });

    let msg = `Hi, I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ${currencySymbol} ${totalPrice.toLocaleString("en-IN")}`;
    if (customerName.trim()) {
      msg += `\n\nName: ${customerName.trim()}`;
    }

    if (items.length > 20) {
      const shown = lines.slice(0, 20).join("\n");
      msg = `Hi, I'd like to order:\n\n${shown}\n...and ${items.length - 20} more items\n\nTotal: ${currencySymbol} ${totalPrice.toLocaleString("en-IN")}`;
      if (customerName.trim()) msg += `\n\nName: ${customerName.trim()}`;
    }

    return encodeURIComponent(msg);
  }

  function handleOrder() {
    const message = buildMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }

  const canOrder = items.length > 0 && whatsappNumber;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="customer-name" className="mb-1 block text-sm font-medium text-foreground">
          Your Name
        </label>
        <input
          id="customer-name"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-neutral)]/20 bg-[var(--color-surface)] px-4 py-2.5 text-sm text-foreground placeholder:text-[var(--color-neutral)]/40 focus:border-[var(--color-primary)] focus:outline-none"
        />
      </div>
      <button
        onClick={handleOrder}
        disabled={!canOrder}
        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-green-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MessageCircle size={18} />
        Order via WhatsApp
      </button>
    </div>
  );
}
