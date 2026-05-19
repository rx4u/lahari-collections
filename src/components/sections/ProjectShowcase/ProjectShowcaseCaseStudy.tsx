"use client";

import { User, Clock, TrendingUp } from "lucide-react";

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

export default function ProjectShowcaseCaseStudy({ content, eyebrow, subtitle }: { content: ProjectShowcaseContent; eyebrow?: string; subtitle?: string }) {
  const { headline, description, projects } = content;

  return (
    <section className="section-y">
      <div className="page-container font-[family-name:var(--font-body)]">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-3">{headline}</h2>
          {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
        </div>

        <div className="space-y-16">
          {projects.map((project, i) => {
            const imageFirst = i % 2 === 0;
            const img = project.image ?? project.images?.[0] ?? project.afterImage;

            return (
              <div
                key={i}
                className={`grid md:grid-cols-2 gap-8 items-center ${!imageFirst ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="aspect-[4/3] rounded-[var(--radius-lg)] bg-muted overflow-hidden">
                  {img ? (
                    <img src={img} alt={project.title} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {project.category && (
                    <span className="text-primary text-sm font-medium">{project.category}</span>
                  )}
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground leading-snug">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  )}

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    {project.client && (
                      <div className="flex items-center gap-1.5">
                        <User size={14} className="text-primary" />
                        <span>{project.client}</span>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-primary" />
                        <span>{project.duration}</span>
                      </div>
                    )}
                    {project.outcome && (
                      <div className="flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-primary" />
                        <span>{project.outcome}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
