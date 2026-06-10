import { site } from "@content/site";
import {
  type Testimonial,
  TestimonialsSection,
} from "@/components/testimonials-section";
import { getQuotesByIds } from "@/lib/content";

export type TestimonialsProps = {
  ids: readonly string[];
  title?: string;
  highlight?: string;
};

export function Testimonials({ ids, title, highlight }: TestimonialsProps) {
  if (!site.showQuotes) return null;

  const quotes = getQuotesByIds(ids);
  if (quotes.length === 0) return null;

  const testimonials: Testimonial[] = quotes.map((q) => ({
    quote: q.quote,
    author: q.author.name,
    position: q.author.position,
    avatar: q.author.avatar,
  }));

  return (
    <TestimonialsSection
      title={title}
      highlight={highlight}
      testimonials={testimonials}
    />
  );
}
