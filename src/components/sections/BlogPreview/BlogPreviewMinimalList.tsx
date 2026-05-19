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

interface BlogPreviewMinimalListProps {
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

export default function BlogPreviewMinimalList({ content, eyebrow, subtitle }: BlogPreviewMinimalListProps) {
  const { headline, viewAllUrl, posts } = content;

  if (!posts?.length) return null;

  return (
    <section id="blog-preview" className="section-y bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
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

        <div className="divide-y divide-border">
          {posts.map((post, i) => (
            <div key={i} className="flex items-baseline gap-4 py-4">
              <span className="w-28 shrink-0 text-sm text-muted-foreground tabular-nums">{post.date}</span>
              <div className="min-w-0 flex-1 flex items-center gap-3 flex-wrap">
                <Link
                  href={post.url}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
                {post.category && (
                  <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {post.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
