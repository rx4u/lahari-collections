"use client";

interface DonationsQrUpiProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  upiId: string;
    qrImage: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function DonationsQrUpi({ content, eyebrow, subtitle }: DonationsQrUpiProps) {
  return (
    <section id="donations" className="section-y">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 text-muted-foreground">{content.description}</p>
        )}
        <div className="mt-8 inline-block rounded-[var(--radius-lg)] border border-border bg-card p-6">
          <img
            src={content.qrImage}
            alt="UPI QR Code"
            className="mx-auto size-48 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
          />
          <p className="mt-4 text-sm text-muted-foreground">Scan to donate</p>
          <p className="mt-2 rounded-[var(--radius-md)] bg-muted px-4 py-2 font-mono text-sm text-foreground">
            {content.upiId}
          </p>
        </div>
      </div>
    </section>
  );
}
