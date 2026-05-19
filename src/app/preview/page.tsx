"use client";

import { useState, useEffect } from "react";
import type { SiteConfig } from "@/lib/types";
import { resolveSection, SectionPlaceholder } from "@/lib/section-renderer";
import ConfiguratorBridge from "@/components/ConfiguratorBridge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import defaultConfig from "../../../site.config";

export default function PreviewPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get("config");
      if (encoded) {
        const parsed = JSON.parse(atob(encoded)) as SiteConfig;
        setConfig(parsed);
      }
    } catch {
      // keep defaultConfig
    }
  }, []);

  function handleConfigChange(partial: Partial<SiteConfig>) {
    setConfig((prev) => ({ ...prev, ...partial }));
  }

  const sections =
    config.layout.type === "multi-page"
      ? config.sections.filter((s) => !s.page || s.page === "home")
      : config.sections;

  return (
    <>
      <ConfiguratorBridge onConfigChange={handleConfigChange} initialConfig={defaultConfig} />
      <Navbar
        businessName={config.business.name}
        logo={config.business.logo}
        sections={config.sections}
        heroCta={config.hero.cta}
        layout={config.layout}
        currentPage="home"
        showCart={!!config.ecommerce}
      />
      <main>
        <Hero config={config.hero} />
        {sections.map((section, i) => {
          const Component = resolveSection(section);
          if (!Component) {
            return (
              <SectionPlaceholder
                key={`${section.type}-${i}`}
                type={section.type}
                variant={section.variant}
              />
            );
          }
          return (
            <Component
              key={`${section.type}-${i}`}
              content={section.content}
              variant={section.variant}
            />
          );
        })}
      </main>
      <Footer
        business={config.business}
        sections={config.sections}
      />
    </>
  );
}
