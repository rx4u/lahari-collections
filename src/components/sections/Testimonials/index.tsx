import TestimonialsCarousel from "./TestimonialsCarousel";
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsFeaturedQuote from "./TestimonialsFeaturedQuote";
import TestimonialsVideoTestimonial from "./TestimonialsVideoTestimonial";
import TestimonialsEditorialCarousel from "./TestimonialsEditorialCarousel";

export default function Testimonials({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "carousel":
      return <TestimonialsCarousel content={content as any} />;
    case "simple-grid":
    case "grid":
      return <TestimonialsGrid content={content as any} />;
    case "featured-quote":
      return <TestimonialsFeaturedQuote content={content as any} />;
    case "video-testimonial":
      return <TestimonialsVideoTestimonial content={content as any} />;
    case "editorial-carousel":
      return <TestimonialsEditorialCarousel content={content as any} />;
    default:
      return <TestimonialsCarousel content={content as any} />;
  }
}
