"use client";

import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-md"
    >
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          {!imgError ? (
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full" style={{ background: "var(--color-surface)" }} />
          )}
        </div>
      )}
      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>
    </Link>
  );
}
