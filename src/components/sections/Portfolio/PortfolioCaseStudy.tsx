"use client";

interface PortfolioCaseStudyProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
  items: Array<{
      title: string;
      client: string;
      challenge: string;
      solution: string;
      result: string;
      image: string;
    }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function PortfolioCaseStudy({ content, eyebrow, subtitle }: PortfolioCaseStudyProps) {
  return (
    <section id="portfolio" className="section-y">
      <div className="page-container">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-4 text-muted-foreground">{content.description}</p>
          )}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {content.items.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card">
              <img
                src={item.image}
                alt={item.title}
                className="aspect-video w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {item.client}
                </p>
                <h3 className="mt-1 text-lg font-medium text-foreground">{item.title}</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Challenge</p>
                    <p className="text-muted-foreground">{item.challenge}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Solution</p>
                    <p className="text-muted-foreground">{item.solution}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Result</p>
                    <p className="text-muted-foreground">{item.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
