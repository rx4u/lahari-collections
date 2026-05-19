"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavConfig, SectionConfig } from "@/lib/types";
import CartIcon from "@/components/ecommerce/CartIcon";

interface NavbarProps {
  businessName: string;
  logo?: string;
  sections: SectionConfig[];
  heroCta?: { text: string; url: string };
  layout?: { type: "single-page" | "multi-page"; pages?: string[] };
  currentPage?: string;
  showCart?: boolean;
  nav?: NavConfig;
}

function sectionLabel(type: string): string {
  return type
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function pageLabel(page: string): string {
  return page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, " ");
}

export default function Navbar({
  businessName,
  logo,
  sections,
  heroCta,
  layout,
  currentPage,
  showCart,
  nav,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isMultiPage = layout?.type === "multi-page" && layout.pages;
  const ctaText = nav?.ctaButton ?? heroCta?.text;
  const ctaHref = nav?.ctaHref ?? heroCta?.url;

  const visibleSections = isMultiPage
    ? []
    : sections.filter((s) => s.navLabel !== null);

  const navLinks = isMultiPage
    ? layout.pages!.map((page) => ({
        label: pageLabel(page),
        href: page === "home" ? "/" : `/${page}`,
        active: page === currentPage,
      }))
    : visibleSections.map((s) => ({
        label: s.navLabel || (s.content.headline as string) || sectionLabel(s.type),
        href: `#${s.type}`,
        active: activeId === s.type,
      }));

  useEffect(() => {
    if (isMultiPage) return;
    const ids = visibleSections.map((s) => s.type);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_1px_0_0_rgba(0,0,0,0.05)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="page-container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          {logo && (
            <img src={logo} alt={businessName} className="h-8 w-8 object-contain" />
          )}
          <span className="font-heading text-lg font-semibold text-foreground">
            {businessName}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-foreground ${
                link.active
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="rounded-[var(--radius-md)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {ctaText}
            </a>
          )}
          {showCart && <CartIcon />}
        </nav>

        {showCart && (
          <div className="flex items-center gap-2 md:hidden">
            <CartIcon />
          </div>
        )}
        <button
          className="inline-flex items-center justify-center rounded-[var(--radius-md)] p-2 text-muted-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-foreground ${
                  link.active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                className="mt-2 rounded-[var(--radius-md)] bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                {ctaText}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
