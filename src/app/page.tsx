import { getConfig } from "@/lib/config";
import { resolveSection, SectionPlaceholder } from "@/lib/section-renderer";
import SectionWrapper from "@/components/sections/SectionWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";

export default function Home() {
  const config = getConfig();

  const sections =
    config.layout.type === "multi-page"
      ? config.sections.filter((s) => !s.page || s.page === "home")
      : config.sections;

  return (
    <>
      <Navbar
        businessName={config.business.name}
        logo={config.business.logo}
        sections={config.sections}
        heroCta={config.hero.cta}
        layout={config.layout}
        currentPage="home"
        showCart={!!config.ecommerce}
        nav={config.nav}
      />
      <main>
        <Hero config={config.hero} />
        {sections.map((section, i) => {
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
      <Footer
        business={config.business}
        sections={config.sections}
        footer={config.footer}
      />
    </>
  );
}
