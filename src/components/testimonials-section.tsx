import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  title?: React.ReactNode;
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  title = (
    <>
      Lo que dicen nuestros <span className="text-brand">clientes</span>
    </>
  ),
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="pb-12 lg:pb-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-8 sm:text-4xl lg:text-5xl pt-12 lg:pt-20 uppercase">
          {title}
        </h2>

        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.author}>
                  <div className="flex flex-col gap-6 p-6 text-center">
                    <p className="text-4xl md:text-5xl lg:text-6xl italic font-extrabold leading-none">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={
                              testimonial.avatar || '/placeholder-avatar.jpg'
                            }
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-primary-foreground/70 text-sm">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
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
