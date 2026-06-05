import ContactForm from "@/components/contact-form";
import { renderHighlight } from "@/components/content/highlight";

export type ContactSectionItem = {
  heading: string;
  content: string;
};

export type ContactSectionProps = {
  title: string;
  highlight?: string;
  sections: ContactSectionItem[];
};

export function ContactSection({
  title,
  highlight,
  sections,
}: ContactSectionProps) {
  return (
    <section className="bg-primary py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="text-primary-foreground max-w-lg">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-8">
              {renderHighlight(title, highlight)}
            </h2>
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-xl font-semibold mb-2">
                    {section.heading}
                  </h3>
                  <p className="text-primary-foreground/80">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card p-8 sm:p-10 rounded-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
