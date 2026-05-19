import CTABanner from "./CTABanner";
import CTASplit from "./CTASplit";
import CTAFloatingBar from "./CTAFloatingBar";
import CTACountdown from "./CTACountdown";

export default function CTA({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "banner":
      return <CTABanner content={content as any} />;
    case "split":
      return <CTASplit content={content as any} />;
    case "floating-bar":
      return <CTAFloatingBar content={content as any} />;
    case "countdown":
      return <CTACountdown content={content as any} />;
    default:
      return <CTABanner content={content as any} />;
  }
}
