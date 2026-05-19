import { Mail, MapPin, Phone } from "lucide-react";
import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer?: FooterConfig;
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram", facebook: "Facebook", twitter: "Twitter",
  youtube: "YouTube", linkedin: "LinkedIn", whatsapp: "WhatsApp",
};

export default function FooterEditorialDark({ business, sections, footer }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null)
    .map((s) => ({ label: s.navLabel || s.type, href: `#${s.type}` }));

  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  return (
    <footer style={{ backgroundColor: footer?.bgColor ?? "var(--color-forced-dark)" }} className="text-[var(--color-on-forced-dark)]">
      <div className="page-container pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <div className="lg:col-span-1">
            <p className="font-heading text-3xl font-bold leading-tight text-[var(--color-on-forced-dark)]">{business.name}</p>
            <p className="mt-4 text-sm text-[var(--color-on-forced-dark-muted)] leading-relaxed max-w-xs">{business.description}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-on-forced-dark-muted)] mb-5">Pages</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-sm text-[var(--color-on-forced-dark-muted)] transition-colors hover:text-[var(--color-on-forced-dark)] capitalize">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-on-forced-dark-muted)] mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-sm text-[var(--color-on-forced-dark-muted)] hover:text-[var(--color-on-forced-dark)] transition-colors">
                <Phone className="h-4 w-4 shrink-0" />{business.phone}
              </a>
              <a href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-sm text-[var(--color-on-forced-dark-muted)] hover:text-[var(--color-on-forced-dark)] transition-colors">
                <Mail className="h-4 w-4 shrink-0" />{business.email}
              </a>
              <p className="flex items-start gap-2 text-sm text-[var(--color-on-forced-dark-muted)]">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{business.address}, {business.city}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-[var(--color-on-forced-dark-muted)]">
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          {socialEntries.length > 0 && (
            <div className="flex gap-5">
              {socialEntries.map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[var(--color-on-forced-dark-muted)] transition-colors hover:text-[var(--color-on-forced-dark)]">
                  {SOCIAL_LABELS[key] || key}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
