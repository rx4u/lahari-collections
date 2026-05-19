"use client";

type Project = {
  title: string;
  description?: string;
  category?: string;
  beforeImage?: string;
  afterImage?: string;
  image?: string;
  images?: string[];
  client?: string;
  duration?: string;
  outcome?: string;
};

type ProjectShowcaseContent = {
  headline: string;
  description?: string;
  projects: Project[];
};

export default function ProjectShowcaseBeforeAfter({ content, eyebrow, subtitle }: { content: ProjectShowcaseContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description, projects } = content;

  return (
    <section className="section-y">
      <div className="page-container font-[family-name:var(--font-body)]">
        <div className="mb-10 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">{headline}</h2>
          {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="space-y-12">
          {projects.map((project, i) => (
            <div key={i}>
              <div className="relative flex rounded-[var(--radius-lg)] overflow-hidden aspect-[16/7]">
                <div className="relative w-1/2 bg-muted overflow-hidden">
                  {project.beforeImage ? (
                    <img src={project.beforeImage} alt="Before" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  <span className="absolute top-3 left-3 bg-muted/80 text-foreground text-xs px-2 py-1 rounded font-medium">
                    Before
                  </span>
                </div>

                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border z-10" />

                <div className="relative w-1/2 bg-muted overflow-hidden">
                  {project.afterImage ? (
                    <img src={project.afterImage} alt="After" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50" />
                  )}
                  <span className="absolute top-3 right-3 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded font-medium">
                    After
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  {project.category && (
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
