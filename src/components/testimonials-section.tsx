import Image from "next/image";
import { renderHighlight } from "@/components/content/highlight";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  highlight?: string;
  titleClassName?: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  title,
  highlight,
  titleClassName,
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="pb-12 lg:pb-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {title ? (
          <h2
            className={cn(
              "text-3xl font-extrabold text-center mb-8 sm:text-4xl lg:text-5xl pt-12 lg:pt-20 uppercase text-shadow-xs",
              titleClassName,
            )}
          >
            {renderHighlight(title, highlight)}
          </h2>
        ) : null}

        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={`${testimonial.author}-${testimonial.quote}`}
                >
                  <article className="flex flex-col gap-6 p-6 text-center">
                    <blockquote>
                      <p className="text-2xl md:text-3xl lg:text-4xl italic font-extrabold leading-none">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <footer className="flex items-center justify-center gap-4 mt-4">
                        {testimonial.avatar ? (
                          <div className="w-16 h-16 flex-shrink-0">
                            <div className="relative w-full h-full rounded-full overflow-hidden">
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.author}
                                fill
                                loading="lazy"
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ) : null}
                        <cite className="not-italic text-left">
                          <span className="block font-bold text-lg">
                            {testimonial.author}
                          </span>
                          <span className="block text-primary-foreground/70 text-sm">
                            {testimonial.position}
                          </span>
                        </cite>
                      </footer>
                    </blockquote>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-6 right-6 flex gap-4">
              <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
              <CarouselNext className="static translate-y-0 h-14 w-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
