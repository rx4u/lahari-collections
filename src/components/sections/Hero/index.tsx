import type { HeroConfig } from "@/lib/types";
import HeroExternal from "@/hero-external";
import HeroCentered from "./HeroCentered";
import HeroSplitImage from "./HeroSplitImage";
import HeroImageBg from "./HeroImageBg";
import HeroVideoBg from "./HeroVideoBg";
import HeroGradient from "./HeroGradient";
import HeroMinimal from "./HeroMinimal";
import HeroCarousel from "./HeroCarousel";
import HeroParallax from "./HeroParallax";
import HeroCollage from "./HeroCollage";
import HeroMapHero from "./HeroMapHero";
import HeroProduct from "./HeroProduct";
import HeroStatsHero from "./HeroStatsHero";
import HeroEditorialBg from "./HeroEditorialBg";

interface HeroProps {
  config: HeroConfig;
  mapUrl?: string;
}

export default function Hero({ config, mapUrl }: HeroProps) {
  const { style, headline, subheadline, cta, secondaryCta, image, video, images } = config;

  switch (style) {
    case "centered":
      return (
        <HeroCentered
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
        />
      );
    case "split-image":
      return (
        <HeroSplitImage
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          image={image}
        />
      );
    case "image-bg":
      return (
        <HeroImageBg
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          image={image}
        />
      );
    case "video-bg":
      return (
        <HeroVideoBg
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          video={video}
          image={image}
        />
      );
    case "gradient":
      return (
        <HeroGradient
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
        />
      );
    case "minimal":
      return (
        <HeroMinimal
          headline={headline}
          subheadline={subheadline}
          cta={cta}
        />
      );
    case "carousel":
      return (
        <HeroCarousel
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          images={images}
        />
      );
    case "parallax":
      return (
        <HeroParallax
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          image={image}
        />
      );
    case "collage":
      return (
        <HeroCollage
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          images={images}
        />
      );
    case "map-hero":
      return (
        <HeroMapHero
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          mapUrl={mapUrl}
        />
      );
    case "product":
      return (
        <HeroProduct
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
          image={image}
        />
      );
    case "stats-hero":
      return (
        <HeroStatsHero
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
        />
      );
    case "editorial-bg":
      return (
        <HeroEditorialBg
          headline={headline}
          subheadline={subheadline}
          eyebrow={config.eyebrow}
          cta={cta}
          secondaryCta={secondaryCta}
          image={image}
          credentialBar={config.credentialBar}
        />
      );
    case "external":
      return <HeroExternal config={config} />;
    default:
      return (
        <HeroCentered
          headline={headline}
          subheadline={subheadline}
          cta={cta}
          secondaryCta={secondaryCta}
        />
      );
  }
}
