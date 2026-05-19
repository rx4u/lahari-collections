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

export default function Footer4ColumnInfo({ business, sections, footer }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null)
    .map((s) => ({ label: s.navLabel || s.type, href: `#${s.type}` }));

  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  return (
    <footer className="bg-card border-t border-border">
      <div className="page-container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-heading text-xl font-bold text-foreground">{business.name}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{business.description}</p>
            {socialEntries.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {socialEntries.map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                    {SOCIAL_LABELS[key] || key}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Navigation</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground capitalize">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 shrink-0" />{business.phone}
              </a>
              <a href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 shrink-0" />{business.email}
              </a>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{business.address}, {business.city}, {business.state} {business.pincode}</span>
              </p>
            </div>
          </div>

          {footer?.includeHours && business.hours && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Hours</p>
              <div className="flex flex-col gap-1.5">
                {Object.entries(business.hours).map(([day, h]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{day}</span>
                    <span className="text-foreground">
                      {h === "closed" ? "Closed" : `${h.open}–${h.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="page-container py-4">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
