"use client";

import { icons } from "lucide-react";

interface ContactMinimalProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  email?: string;
    phone?: string;
    address?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ContactMinimal({ content, eyebrow, subtitle }: ContactMinimalProps) {
  const MailIcon = icons["Mail"];
  const PhoneIcon = icons["Phone"];
  const MapPinIcon = icons["MapPin"];

  return (
    <section id="contact" className="section-y">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 text-muted-foreground">{content.description}</p>
        )}
        <div className="mt-10 space-y-6">
          {content.email && (
            <div className="flex items-center justify-center gap-3">
              {MailIcon && <MailIcon className="size-5 text-primary" />}
              <a href={`mailto:${content.email}`} className="text-foreground hover:text-primary">
                {content.email}
              </a>
            </div>
          )}
          {content.phone && (
            <div className="flex items-center justify-center gap-3">
              {PhoneIcon && <PhoneIcon className="size-5 text-primary" />}
              <a href={`tel:${content.phone}`} className="text-foreground hover:text-primary">
                {content.phone}
              </a>
            </div>
          )}
          {content.address && (
            <div className="flex items-center justify-center gap-3">
              {MapPinIcon && <MapPinIcon className="size-5 text-primary" />}
              <span className="text-muted-foreground">{content.address}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
