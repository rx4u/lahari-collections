import React from "react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getConfig } from "@/lib/config";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteContainer from "@/components/layout/SiteContainer";
import PageHeader from "@/components/layout/PageHeader";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const config = getConfig();
  const posts = config.features?.blog ? getAllPosts() : [];
  if (posts.length === 0) return [{ slug: "_placeholder" }];
  return posts.map((post) => ({ slug: post.slug }));
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-4 list-disc pl-6 space-y-1">
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={i} className="mt-8 mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="mt-6 mb-2 text-xl font-semibold">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={i} className="my-3 leading-relaxed">
          {line}
        </p>
      );
    }
  });
  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getConfig();

  if (!config.features?.blog) notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar
        businessName={config.business.name}
        logo={config.business.logo}
        sections={config.sections}
        heroCta={config.hero.cta}
        layout={config.layout}
        currentPage="blog"
        showCart={!!config.ecommerce}
      />
      <main className="min-h-screen pt-20">
        <PageHeader
          title={post.title}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <SiteContainer as="article" className="py-12 max-w-3xl">
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span>
              <span>·</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </header>

          {post.image && (
            <div className="mb-8 overflow-hidden rounded-xl aspect-[16/9] bg-muted">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="text-foreground/80">
            {renderMarkdown(post.content)}
          </div>
        </SiteContainer>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}
