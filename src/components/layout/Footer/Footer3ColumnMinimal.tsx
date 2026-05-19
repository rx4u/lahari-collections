import { Mail, Phone } from "lucide-react";
import type { BusinessConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
}

export default function Footer3ColumnMinimal({ business, sections }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null)
    .map((s) => ({ label: s.navLabel || s.type, href: `#${s.type}` }));

  return (
    <footer className="bg-background border-t border-border">
      <div className="page-container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">{business.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{business.tagline}</p>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">Links</p>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground capitalize">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">Get in Touch</p>
            <a href={`tel:${business.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-4 w-4 shrink-0" />{business.phone}
            </a>
            <a href={`mailto:${business.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4 shrink-0" />{business.email}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {business.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
