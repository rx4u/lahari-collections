interface ContactSplitMapProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function ContactSplitMap({ content, eyebrow, subtitle }: ContactSplitMapProps) {
  return (
    <section id="contact" className="section-y">
      <div className="page-container">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground">
          {content.headline}
        </h2>
        {content.description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {content.description}
          </p>
        )}

        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
          <form className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1.5 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone</label>
              <input
                type="tel"
                placeholder="Your phone number"
                className="mt-1.5 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="mt-1.5 w-full rounded-[var(--radius-md)] border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            <button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="bg-muted rounded-[var(--radius-lg)] p-8 flex items-center justify-center min-h-[300px]">
            <p className="text-muted-foreground">Map &amp; directions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
