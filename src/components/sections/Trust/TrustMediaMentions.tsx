"use client";

interface MediaItem {
  publication: string;
  logo?: string;
  quote?: string;
  url?: string;
}

interface TrustMediaMentionsProps {
  content: {
    headline?: string;
    eyebrow?: string;
    subtitle?: string;
    items: MediaItem[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function TrustMediaMentions({ content, eyebrow, subtitle }: TrustMediaMentionsProps) {
  const { headline = "As Seen In", items } = content;

  return (
    <section id="trust" className="section-y bg-background">
      <div className="page-container">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {headline}
        </p>

        <div className="rounded-xl bg-muted/40 px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {items.map((item, i) => {
              const inner = item.logo ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={item.logo} alt={item.publication} className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                  {item.quote && (
                    <p className="max-w-[160px] text-center text-xs italic text-muted-foreground">"{item.quote}"</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    {item.publication}
                  </span>
                  {item.quote && (
                    <p className="max-w-[160px] text-center text-xs italic text-muted-foreground">"{item.quote}"</p>
                  )}
                </div>
              );

              return item.url ? (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
