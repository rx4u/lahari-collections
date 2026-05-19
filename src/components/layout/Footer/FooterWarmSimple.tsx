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

export default function FooterWarmSimple({ business, sections, footer }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null)
    .map((s) => ({ label: s.navLabel || s.type, href: `#${s.type}` }));

  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  return (
    <footer
      style={{ backgroundColor: footer?.bgColor ?? "var(--color-surface)" }}
      className="border-t border-border"
    >
      <div className="page-container py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-xs">
            <p className="font-heading text-xl font-semibold text-foreground">{business.name}</p>
            {business.tagline && (
              <p className="mt-2 text-sm text-muted-foreground italic">{business.tagline}</p>
            )}
            <div className="mt-5 flex flex-col gap-2">
              {business.phone && (
                <a href={`tel:${business.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 shrink-0" />{business.phone}
                </a>
              )}
              {business.email && (
                <a href={`mailto:${business.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0" />{business.email}
                </a>
              )}
              {business.address && (
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{business.address}, {business.city}</span>
                </p>
              )}
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">Quick Links</p>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground capitalize">
                {link.label}
              </a>
            ))}
          </nav>

          {socialEntries.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {socialEntries.map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {SOCIAL_LABELS[key] || key}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
