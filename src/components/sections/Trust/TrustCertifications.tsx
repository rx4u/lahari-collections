"use client";

import { ShieldCheck } from "lucide-react";

interface CertItem {
  name: string;
  issuedBy?: string;
  year?: string;
  logo?: string;
}

interface TrustCertificationsProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    items: CertItem[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function TrustCertifications({ content, eyebrow, subtitle }: TrustCertificationsProps) {
  const { headline, description, items } = content;

  return (
    <section id="trust" className="section-y bg-background">
      <div className="page-container">
        <div className="mb-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center"
            >
              {item.logo ? (
                <img src={item.logo} alt={item.name} className="h-12 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <ShieldCheck className="h-10 w-10 text-primary" strokeWidth={1.5} />
              )}
              <div>
                <p className="font-semibold text-foreground text-sm leading-snug">{item.name}</p>
                {item.issuedBy && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.issuedBy}</p>
                )}
                {item.year && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.year}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
