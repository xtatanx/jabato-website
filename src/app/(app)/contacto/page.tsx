import Image from "next/image";
import ContactForm from "@/components/contact-form";
import LexicalRenderer from "@/components/lexical-renderer";
import {
  getContactPageSchema,
  getOrganizationSchema,
} from "@/lib/structured-data";
import { getContactPage } from "@/lib/pages-data";
import { getMediaUrl, isMediaPopulated } from "@/lib/media";

export default async function ContactoPage() {
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getContactPageSchema();
  const contactPageData = await getContactPage();

  const hero = contactPageData?.hero;
  const contactInfo = contactPageData?.contactInfo;

  const hasHero =
    hero && (hero.title || (hero.heroImage && isMediaPopulated(hero.heroImage)));
  const hasContactInfo =
    contactInfo &&
    (contactInfo.title ||
      (contactInfo.sections && contactInfo.sections.length > 0));

  const heroImage = hero?.heroImage && isMediaPopulated(hero.heroImage) ? hero.heroImage : null;
  const heroImageUrl = heroImage ? getMediaUrl(heroImage) : null;

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div>
        {hasHero && hero && (
          <section className="bg-primary relative grid items-center gap-8 min-h-[400px] lg:aspect-video lg:gap-12 lg:max-h-[400px] lg:w-full">
            {heroImageUrl && heroImage && (
              <>
                <Image
                  src={heroImageUrl}
                  className="object-cover z-0"
                  alt={typeof heroImage === "object" && "alt" in heroImage ? heroImage.alt ?? "" : ""}
                  fill
                  priority
                />
                <div className="absolute inset-0 bg-black/30 z-0" />
              </>
            )}
            {hero.title && (
              <div className="container mx-auto grid-area-1 relative z-10 px-4 text-center">
                <LexicalRenderer
                  data={hero.title}
                  className="text-shadow-xs text-primary-foreground"
                  enableGutter={false}
                  enableProse={false}
                />
              </div>
            )}
          </section>
        )}

        <section className="bg-primary py-12 lg:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div
              className={
                hasContactInfo
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
                  : "max-w-xl mx-auto"
              }
            >
              {hasContactInfo && contactInfo && (
                <div className="text-primary-foreground max-w-lg">
                  {contactInfo.title && (
                    <LexicalRenderer
                      data={contactInfo.title}
                      className="text-primary-foreground mb-8"
                      enableGutter={false}
                      enableProse={false}
                    />
                  )}
                  {contactInfo.sections && contactInfo.sections.length > 0 && (
                    <div className="space-y-6">
                      {contactInfo.sections.map((section) => (
                        <div key={section.id ?? section.heading}>
                          <h3 className="text-xl font-semibold mb-2">{section.heading}</h3>
                          <p className="text-primary-foreground/80">{section.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="bg-card p-10 rounded-lg">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
