import { Check, Phone, Mail } from "lucide-react";

interface AdmissionsInfoCardProps {
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

export default function AdmissionsInfoCard({ content, eyebrow, subtitle }: AdmissionsInfoCardProps) {
  const { headline, description, requirements, importantDates, contactEmail, contactPhone, cta } = content;

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

        <div className="max-w-2xl mx-auto bg-card border border-border rounded-[var(--radius-lg)] p-8 space-y-8">
          {requirements && requirements.length > 0 && (
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground text-lg mb-4">
                Requirements
              </h3>
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {importantDates && importantDates.length > 0 && (
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground text-lg mb-4">
                Important Dates
              </h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {importantDates.map((d, i) => (
                    <tr key={i}>
                      <td className="py-2.5 text-muted-foreground">{d.label}</td>
                      <td className="py-2.5 text-foreground font-medium text-right">{d.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(contactEmail || contactPhone) && (
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground text-lg mb-4">
                Contact Admissions
              </h3>
              <div className="space-y-3">
                {contactPhone && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>{contactPhone}</span>
                  </div>
                )}
                {contactEmail && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>{contactEmail}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {cta && (
            <div className="pt-2">
              <a
                href={cta.url}
                className="block w-full text-center bg-[var(--color-primary)] text-[var(--color-on-primary)] font-medium px-6 py-3 rounded-[var(--radius-sm)] text-sm hover:opacity-90 transition-opacity"
              >
                {cta.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
