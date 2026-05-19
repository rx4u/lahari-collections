import CaseResultsStats from "./CaseResultsStats";
import CaseResultsTestimonialStyle from "./CaseResultsTestimonialStyle";

type CaseResultsContent = {
  headline: string;
  description?: string;
  stats: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
};

export default function CaseResults({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as CaseResultsContent };

  switch (variant) {
    case "stats":
      return <CaseResultsStats {...props} />;
    case "testimonial-style":
      return <CaseResultsTestimonialStyle {...props} />;
    default:
      return <CaseResultsStats {...props} />;
  }
}
