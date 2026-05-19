import { CheckCircle2 } from "lucide-react";

type DonationsSimpleFormContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  impactPoints?: string[];
  amounts?: number[];
  currency?: string;
};

export default function DonationsSimpleForm({
  content,
  eyebrow,
  subtitle,
}: {
  content: DonationsSimpleFormContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const {
    headline,
    description,
    impactPoints = [],
    amounts = [500, 1000, 2000, 5000],
    currency = "₹",
  } = content;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Impact */}
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-display)]"
            >
              {headline}
            </h2>
            {description && (
              <p className="text-muted-foreground mb-6 leading-relaxed font-[family-name:var(--font-body)]">
                {description}
              </p>
            )}
            {impactPoints.length > 0 && (
              <ul className="space-y-3">
                {impactPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-primary"
                      size={18}
                    />
                    <span className="text-sm text-foreground font-[family-name:var(--font-body)]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Donation Form */}
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-6 md:p-8">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 font-[family-name:var(--font-body)]">
              Choose an amount
            </p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className="bg-muted hover:bg-primary hover:text-primary-foreground text-foreground text-sm font-semibold rounded-[var(--radius-sm)] px-3 py-2 transition-colors font-[family-name:var(--font-body)]"
                >
                  {currency}{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-muted-foreground mb-1 font-[family-name:var(--font-body)]">
                Or enter custom amount
              </label>
              <div className="flex items-center border border-border rounded-[var(--radius-sm)] overflow-hidden">
                <span className="px-3 text-muted-foreground text-sm bg-muted border-r border-border font-[family-name:var(--font-body)]">
                  {currency}
                </span>
                <input
                  type="number"
                  placeholder="0"
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-foreground font-[family-name:var(--font-body)]"
                />
              </div>
            </div>
            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-border rounded-[var(--radius-sm)] px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 ring-primary text-foreground font-[family-name:var(--font-body)]"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-border rounded-[var(--radius-sm)] px-3 py-2 text-sm bg-transparent outline-none focus:ring-1 ring-primary text-foreground font-[family-name:var(--font-body)]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-[var(--radius-sm)] text-sm hover:opacity-90 transition-opacity font-[family-name:var(--font-body)]"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
