import { Check, Phone, Mail } from "lucide-react";

interface AdmissionsFormProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  steps?: Array<{ step: number; title: string; description: string; deadline?: string }>;
    requirements?: string[];
    importantDates?: Array<{ label: string; date: string }>;
    contactEmail?: string;
    contactPhone?: string;
    cta?: { text: string; url: string };
  };
  eyebrow?: string;
  subtitle?: string;
}

const inputClass =
  "border border-border rounded-[var(--radius-sm)] px-3 py-2 w-full bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

export default function AdmissionsForm({ content, eyebrow, subtitle }: AdmissionsFormProps) {
  const { headline, description, requirements, importantDates, contactEmail, contactPhone } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 space-y-6">
            {requirements && requirements.length > 0 && (
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mb-3">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {importantDates && importantDates.length > 0 && (
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mb-3">
                  Important Dates
                </h3>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    {importantDates.map((d, i) => (
                      <tr key={i}>
                        <td className="py-2 text-muted-foreground">{d.label}</td>
                        <td className="py-2 text-foreground font-medium text-right">{d.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {(contactEmail || contactPhone) && (
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mb-3">
                  Contact
                </h3>
                <div className="space-y-2">
                  {contactPhone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      {contactPhone}
                    </div>
                  )}
                  {contactEmail && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      {contactEmail}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-foreground">Full Name</label>
                <input type="text" placeholder="Jane Smith" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-foreground">Email</label>
                <input type="email" placeholder="jane@example.com" className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-foreground">Phone</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-foreground">Course of Interest</label>
              <select className={inputClass}>
                <option value="">Select a program</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="diploma">Diploma</option>
                <option value="certificate">Certificate</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-foreground">Message</label>
              <textarea rows={4} placeholder="Tell us about yourself..." className={inputClass} />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded-[var(--radius-sm)] px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity w-full"
            >
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
