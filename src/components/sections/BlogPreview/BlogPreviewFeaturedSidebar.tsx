"use client";

import Link from "next/link";

interface Post {
  title: string;
  excerpt?: string;
  image?: string;
  date: string;
  author?: string;
  category?: string;
  url: string;
}

interface BlogPreviewFeaturedSidebarProps {
  content: {
    headline: string;
    eyebrow?: string;
    subtitle?: string;
    viewAllUrl?: string;
    posts: Post[];
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function BlogPreviewFeaturedSidebar({ content, eyebrow, subtitle }: BlogPreviewFeaturedSidebarProps) {
  const { headline, viewAllUrl, posts } = content;
  const featured = posts[0];
  const sidebar = posts.slice(1);

  if (!featured) return null;

  return (
    <section id="blog-preview" className="section-y bg-background">
      <div className="page-container">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {headline}
          </h2>
          {viewAllUrl && (
            <Link href={viewAllUrl} className="text-sm font-medium text-primary hover:underline underline-offset-2 shrink-0 ml-4">
              View all →
            </Link>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Link href={featured.url} className="group block rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
              {featured.image && (
                <div className="h-64 overflow-hidden bg-muted">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                </div>
              )}
              <div className="p-6">
                {featured.category && (
                  <span className="inline-block mb-3 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {featured.category}
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="mt-3 text-muted-foreground line-clamp-3">{featured.excerpt}</p>
                )}
                <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{featured.date}</span>
                  {featured.author && <><span>·</span><span>{featured.author}</span></>}
                </div>
                <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline underline-offset-2">
                  Read more →
                </span>
              </div>
            </Link>
          </div>

          {sidebar.length > 0 && (
            <div className="flex flex-col divide-y divide-border">
              {sidebar.map((post, i) => (
                <Link key={i} href={post.url} className="group flex items-start gap-3 py-4 first:pt-0 last:pb-0 hover:opacity-80 transition-opacity">
                  {post.image && (
                    <div className="w-20 h-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-muted">
                      <img src={post.image} alt={post.title} className="h-full w-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
