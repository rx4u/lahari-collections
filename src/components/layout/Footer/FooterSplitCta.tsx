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

export default function FooterSplitCta({ business, sections, footer }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null)
    .map((s) => ({ label: s.navLabel || s.type, href: `#${s.type}` }));

  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  const ctaHeading = footer?.ctaHeading ?? `Ready to work with ${business.name}?`;
  const ctaButtonText = footer?.ctaButtonText ?? "Get in Touch";
  const ctaButtonHref = footer?.ctaButtonHref ?? `mailto:${business.email}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="page-container">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-primary px-8 py-14 flex flex-col justify-center">
            <p className="font-heading text-2xl sm:text-3xl font-bold leading-snug text-primary-foreground max-w-sm">
              {ctaHeading}
            </p>
            <a
              href={ctaButtonHref}
              className="mt-8 inline-flex w-fit items-center rounded-[var(--radius-md)] bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              {ctaButtonText}
            </a>
          </div>

          <div className="px-8 py-14 flex flex-col justify-between gap-10">
            <div>
              <p className="font-heading text-lg font-semibold text-foreground">{business.name}</p>
              <div className="mt-4 flex flex-col gap-2">
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

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              {navLinks.length > 0 && (
                <nav className="flex flex-wrap gap-x-4 gap-y-2">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground capitalize">
                      {link.label}
                    </a>
                  ))}
                </nav>
              )}
              {socialEntries.length > 0 && (
                <div className="flex gap-4">
                  {socialEntries.map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                      {SOCIAL_LABELS[key] || key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border py-4">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
