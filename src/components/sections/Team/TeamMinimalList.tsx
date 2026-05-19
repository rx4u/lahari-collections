"use client";

interface TeamMinimalListProps {
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

export default function TeamMinimalList({ content, eyebrow, subtitle }: TeamMinimalListProps) {
  const { headline, description, members } = content;

  return (
    <section id="team" className="section-y">
      <div className="page-container">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-xl">{description}</p>
          )}
        </div>

        <div className="max-w-2xl">
          {members.map((member, index) => (
            <div key={member.name}>
              <div className="flex items-center gap-4 py-5">
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
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
              {index < members.length - 1 && (
                <div className="border-t border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
