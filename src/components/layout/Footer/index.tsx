import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";
import Footer4ColumnInfo from "./Footer4ColumnInfo";
import Footer3ColumnMinimal from "./Footer3ColumnMinimal";
import FooterEditorialDark from "./FooterEditorialDark";
import FooterWarmSimple from "./FooterWarmSimple";
import FooterSplitCta from "./FooterSplitCta";

interface FooterProps {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer?: FooterConfig;
}

export default function Footer({ business, sections, footer }: FooterProps) {
  const variant = footer?.variant ?? "3-column-minimal";

  if (variant === "4-column-info") {
    return <Footer4ColumnInfo business={business} sections={sections} footer={footer} />;
  }
  if (variant === "editorial-dark") {
    return <FooterEditorialDark business={business} sections={sections} footer={footer} />;
  }
  if (variant === "warm-simple") {
    return <FooterWarmSimple business={business} sections={sections} footer={footer} />;
  }
  if (variant === "split-cta") {
    return <FooterSplitCta business={business} sections={sections} footer={footer} />;
  }
  return <Footer3ColumnMinimal business={business} sections={sections} />;
}
