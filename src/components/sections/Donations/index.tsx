import DonationsQrUpi from "./DonationsQrUpi";
import DonationsCtaTiers from "./DonationsCtaTiers";
import DonationsSimpleForm from "./DonationsSimpleForm";

export default function Donations({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "qr-upi":
      return <DonationsQrUpi content={content as any} />;
    case "cta-with-tiers":
      return <DonationsCtaTiers content={content as any} />;
    case "simple-form":
      return <DonationsSimpleForm content={content as any} />;
    default:
      return <DonationsQrUpi content={content as any} />;
  }
}
