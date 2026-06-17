import { b2bFaqItems } from "@content/data/b2b-faq";
import { b2bLandingCopy } from "@content/data/b2b-landing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function B2BFaqSection() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-8 font-heading text-5xl uppercase sm:text-6xl lg:text-7xl">
          {b2bLandingCopy.faqTitle}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {b2bFaqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="py-5 text-lg lg:text-xl">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base lg:text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
