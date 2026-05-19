"use client";

import { useState } from "react";

interface BookingInlineFormProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    services?: string[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function BookingInlineForm({ content, eyebrow, subtitle }: BookingInlineFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="booking" className="section-y">
      <div className="page-container">
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mt-4 text-muted-foreground">
                {content.description}
              </p>
            )}
          </div>

          {submitted ? (
            <div className="rounded-[var(--radius-lg)] border border-border bg-card p-8 text-center">
              <p className="text-lg font-medium text-foreground">
                Thank you! We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 rounded-[var(--radius-lg)] border border-border bg-card p-6 sm:p-8"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your phone number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              {content.services && content.services.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Service
                  </label>
                  <select className="w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select a service</option>
                    {content.services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="w-full rounded-[var(--radius-md)] bg-primary px-4 py-2.5 font-medium text-[var(--color-on-primary)] transition-opacity hover:opacity-90"
              >
                Book Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
