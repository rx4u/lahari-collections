"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { icons } from "lucide-react";

interface ContactSplitInfoProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
    formFields?: Array<{ name: string; type: string; placeholder: string; required?: boolean }>;
    submitText?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function ContactSplitInfo({ content }: ContactSplitInfoProps) {
  const PhoneIcon = icons["Phone"];
  const MailIcon = icons["Mail"];
  const MapPinIcon = icons["MapPin"];
  const ClockIcon = icons["Clock"];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  const details = [
    { icon: PhoneIcon, label: "Phone", value: content.phone },
    { icon: MailIcon, label: "Email", value: content.email },
    { icon: MapPinIcon, label: "Address", value: content.address },
    { icon: ClockIcon, label: "Hours", value: content.hours },
  ].filter((d) => d.value);

  const formFields = [
    { type: "text", placeholder: "Your Name" },
    { type: "email", placeholder: "Email Address" },
    { type: "tel", placeholder: "Phone Number" },
  ];

  return (
    <section id="contact" className="section-y">
      <div ref={ref} className="page-container">
        <motion.div
          className="mb-12"
          initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: premiumEase }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </motion.div>
        <div className="grid gap-12 md:grid-cols-2">
          {/* Info — slides in from left */}
          <motion.div
            className="space-y-6"
            initial={reducedMotion ? undefined : { opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, ease: premiumEase, delay: 0.1 }}
          >
            {details.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={reducedMotion ? undefined : { opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.5, ease: premiumEase, delay: 0.15 + i * 0.08 }}
                >
                  {Icon && <Icon className="mt-0.5 size-5 text-primary" />}
                  <div>
                    <p className="text-sm font-medium text-foreground">{d.label}</p>
                    <p className="text-sm text-muted-foreground">{d.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Form — slides in from right */}
          <motion.form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
            initial={reducedMotion ? undefined : { opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, ease: premiumEase, delay: 0.1 }}
          >
            {formFields.map((field, i) => (
              <motion.input
                key={field.placeholder}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full rounded-[var(--radius-md)] border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, ease: premiumEase, delay: 0.2 + i * 0.08 }}
              />
            ))}
            <motion.textarea
              placeholder="Your Message"
              rows={4}
              className="w-full rounded-[var(--radius-md)] border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: premiumEase, delay: 0.2 + formFields.length * 0.08 }}
            />
            <motion.button
              type="submit"
              className="rounded-[var(--radius-md)] bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: premiumEase, delay: 0.2 + (formFields.length + 1) * 0.08 }}
            >
              {content.submitText ?? "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
