import { getConfig } from "@/lib/config";
import { getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteContainer from "@/components/layout/SiteContainer";
import PageHeader from "@/components/layout/PageHeader";
import BlogPostCard from "./BlogPostCard";

export default function BlogListingPage() {
  const config = getConfig();

  if (!config.features?.blog) notFound();

  const posts = getAllPosts();

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
          title="Blog"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          subtitle={`Stories, tips, and updates from ${config.business.name}`}
        />
        <SiteContainer className="py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </SiteContainer>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}
