"use client";

interface TeamFeaturedSingleProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    members: Array<{ name: string; role: string; image?: string; bio?: string }>;
  };
  eyebrow?: string;
  subtitle?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamFeaturedSingle({ content, eyebrow, subtitle }: TeamFeaturedSingleProps) {
  const { headline, description, members } = content;
  const featured = members[0];
  const rest = members.slice(1);

  return (
    <section id="team" className="section-y">
      <div className="page-container">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        {featured && (
          <div className="flex flex-col md:flex-row gap-10 mb-16 items-center">
            <div className="shrink-0">
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <div className="bg-primary/10 text-primary rounded-2xl w-48 h-48 md:w-64 md:h-64 flex items-center justify-center text-4xl font-bold">
                  {getInitials(featured.name)}
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                Featured
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-foreground">
                {featured.name}
              </h3>
              <p className="text-muted-foreground mt-1">{featured.role}</p>
              {featured.bio && (
                <p className="mt-4 text-foreground/80 leading-relaxed max-w-lg">
                  {featured.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rest.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold shrink-0">
                    {getInitials(member.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
