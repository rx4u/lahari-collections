import { getConfig } from "@/lib/config";
import { resolveSection, SectionPlaceholder } from "@/lib/section-renderer";
import SectionWrapper from "@/components/sections/SectionWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import { notFound } from "next/navigation";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const config = getConfig();
  if (config.layout.type !== "multi-page" || !config.layout.pages) {
    return [{ page: "_placeholder" }];
  }
  const pages = config.layout.pages.filter((p) => p !== "home");
  if (pages.length === 0) return [{ page: "_placeholder" }];
  return pages.map((page) => ({ page }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { page } = await params;
  const config = getConfig();

  if (config.layout.type !== "multi-page") {
    notFound();
  }

  if (!config.layout.pages?.includes(page)) {
    notFound();
  }

  const pageSections = config.sections.filter((s) => s.page === page);

  return (
    <>
      <Navbar
        businessName={config.business.name}
        logo={config.business.logo}
        sections={config.sections}
        heroCta={config.hero.cta}
        layout={config.layout}
        currentPage={page}
        showCart={!!config.ecommerce}
        nav={config.nav}
      />
      <main>
        {page === "home" && <Hero config={config.hero} />}
        {pageSections.map((section, i) => {
          const Component = resolveSection(section);
          if (!Component) {
            return (
              <SectionPlaceholder
                key={`${i}-${section.type}`}
                type={section.type}
                variant={section.variant}
              />
            );
          }
          return (
            <SectionWrapper key={`${i}-${section.type}`} tier={config.animationTier}>
              <Component content={section.content} variant={section.variant} />
            </SectionWrapper>
          );
        })}
      </main>
      <Footer business={config.business} sections={config.sections} footer={config.footer} />
    </>
  );
}
