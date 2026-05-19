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

export default function ProjectShowcaseGalleryGrid({ content, eyebrow, subtitle }: { content: ProjectShowcaseContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description, projects } = content;

  return (
    <section className="section-y">
      <div className="page-container font-[family-name:var(--font-body)]">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">{headline}</h2>
          {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
        </div>

        <div className="columns-2 sm:columns-3 gap-4">
          {projects.map((project, i) => {
            const img = project.image ?? project.images?.[0] ?? project.afterImage;

            return (
              <div key={i} className="relative group break-inside-avoid mb-4">
                <div className="rounded-[var(--radius-md)] overflow-hidden bg-muted w-full">
                  {img ? (
                    <img
                      src={img}
                      alt={project.title}
                      className="w-full object-cover block"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-muted" />
                  )}
                </div>

                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: hover scrim on project image */}
                <div className="absolute inset-0 rounded-[var(--radius-md)] bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                  {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: title on darkened project image */}
                  <span className="text-white font-semibold text-center text-sm leading-snug">
                    {project.title}
                  </span>
                  {project.category && (
                    // eslint-disable-next-line no-restricted-syntax -- photo overlay: category pill on darkened project image
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
