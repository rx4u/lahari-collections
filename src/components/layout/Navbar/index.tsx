/* Hallmark · macrostructure: Photographic · genre: editorial
 * nav: N9 Edge-aligned minimal · footer: Ft6 Letter close
 * theme: Desert Rose · accent: #6B1D3A (~3% per viewport)
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavConfig, SectionConfig } from "@/lib/types";

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

export default function Navbar({
  businessName,
  sections,
  heroCta,
  layout,
  nav,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const isMultiPage = layout?.type === "multi-page" && layout.pages;
  const ctaText = nav?.ctaButton ?? heroCta?.text;
  const ctaHref = nav?.ctaHref ?? heroCta?.url;

  const visibleSections = isMultiPage
    ? []
    : sections.filter((s) => s.navLabel !== null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "color-mix(in oklch, var(--color-surface) 92%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background-color 240ms cubic-bezier(0.16,1,0.3,1), backdrop-filter 240ms",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: "clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 4vw, 2.5rem)",
        }}
      >
        {/* Wordmark — top-left, no logo image, restrained */}
        <a
          href="#hero"
          className="font-[family-name:var(--font-display)] tracking-tight"
          style={{
            color: scrolled ? "var(--color-primary)" : "var(--color-on-primary)",
            fontSize: "clamp(1rem, 1.15vw, 1.25rem)",
            fontWeight: 500,
            letterSpacing: "0.005em",
            transition: "color 240ms",
          }}
        >
          {businessName}
        </a>

        {/* Single CTA — top-right, no link row */}
        <div className="flex items-center" style={{ gap: "clamp(0.75rem, 1.5vw, 1.25rem)" }}>
          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="hidden md:inline-block font-[family-name:var(--font-sans)]"
              style={{
                whiteSpace: "nowrap",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: scrolled ? "var(--color-primary)" : "var(--color-on-primary)",
                borderBottom: `1px solid ${scrolled ? "var(--color-primary)" : "var(--color-on-primary)"}`,
                paddingBottom: "2px",
                opacity: 0.85,
                transition: "opacity 200ms, color 240ms, border-color 240ms",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.85")}
            >
              {ctaText}
            </a>
          )}
          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center p-2"
            style={{
              color: scrolled ? "var(--color-primary)" : "var(--color-on-primary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet — appears below header, contains anchor links + CTA */}
      {open && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            borderTop: "1px solid color-mix(in oklch, var(--color-primary) 12%, transparent)",
            padding: "1rem clamp(1.25rem, 4vw, 2.5rem) 1.5rem",
          }}
        >
          <nav className="flex flex-col" style={{ gap: "0.5rem" }}>
            {visibleSections.map((s) => (
              <a
                key={s.type}
                href={`#${s.type}`}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-sans)]"
                style={{
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  color: "var(--color-primary)",
                  padding: "0.5rem 0",
                  textDecoration: "none",
                }}
              >
                {s.navLabel || s.type}
              </a>
            ))}
            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-sans)]"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                  padding: "0.5rem 0",
                  marginTop: "0.5rem",
                  borderTop: "1px solid color-mix(in oklch, var(--color-primary) 12%, transparent)",
                }}
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
