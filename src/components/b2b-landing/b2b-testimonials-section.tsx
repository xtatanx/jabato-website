import { b2bLandingCopy, b2bTestimonialIds } from "@content/data/b2b-landing";
import { site } from "@content/site";
import {
  type Testimonial,
  TestimonialsSection,
} from "@/components/testimonials-section";
import { getQuotesByIds } from "@/lib/content";

export function B2BTestimonialsSection() {
  if (!site.showQuotes) {
    return null;
  }

  const quotes = getQuotesByIds(b2bTestimonialIds);
  if (quotes.length === 0) {
    return null;
  }

  const testimonials: Testimonial[] = quotes.map((quote) => ({
    quote: quote.quote,
    author: quote.author.name,
    position: quote.author.position,
    avatar: quote.author.avatar,
  }));

  return (
    <TestimonialsSection
      title={b2bLandingCopy.testimonialsTitle}
      titleClassName="text-brand"
      testimonials={testimonials}
    />
  );
}
