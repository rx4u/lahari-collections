import { AlertTriangle } from "lucide-react";

type Props = {
  content: {
    headline: string;
    phone: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  };
  eyebrow?: string;
  subtitle?: string;
};

export default function EmergencyFloatingCard({ content, eyebrow, subtitle }: Props) {
  const { headline, phone, description } = content;

  return (
    <section className="section-y">
      <div className="page-container flex justify-center">
        <div
          className="bg-card border-2 rounded-[var(--radius-lg)] p-8 max-w-sm w-full text-center"
          style={{
            borderColor: "var(--color-primary)",
            boxShadow: "0 8px 30px color-mix(in srgb, var(--color-primary) 20%, transparent)",
          }}
        >
          <div className="flex justify-center mb-4" style={{ color: "var(--color-primary)" }}>
            <AlertTriangle size={40} />
          </div>

          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-3">
            {headline}
          </h2>

          {description && (
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
          )}

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="font-[family-name:var(--font-display)] font-bold text-3xl block mt-4"
            style={{ color: "var(--color-primary)" }}
          >
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
