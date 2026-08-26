import { B2BCoverageSection } from "@/components/b2b-landing/b2b-coverage-section";
import { B2BFaqSection } from "@/components/b2b-landing/b2b-faq-section";
import { B2BFooterLeadSection } from "@/components/b2b-landing/b2b-footer-lead-section";
import { B2BFormatsSection } from "@/components/b2b-landing/b2b-formats-section";
import { B2BHeroSection } from "@/components/b2b-landing/b2b-hero-section";
import { B2BHowItWorks } from "@/components/b2b-landing/b2b-how-it-works";
import { B2BLandingAnalytics } from "@/components/b2b-landing/b2b-landing-analytics";
import { B2BProductPortfolio } from "@/components/b2b-landing/b2b-product-portfolio";
import { B2BSeoLede } from "@/components/b2b-landing/b2b-seo-lede";
import { B2BTestimonialsSection } from "@/components/b2b-landing/b2b-testimonials-section";
import { B2BValueProps } from "@/components/b2b-landing/b2b-value-props";
import type { BeerData } from "@/lib/content";

interface B2BLandingPageProps {
  beers: BeerData[];
}

export function B2BLandingPage({ beers }: B2BLandingPageProps) {
  return (
    <div>
      <B2BLandingAnalytics />
      <B2BHeroSection />
      <B2BSeoLede />
      <B2BValueProps />
      <B2BHowItWorks />
      <B2BProductPortfolio beers={beers} />
      <B2BFormatsSection />
      <B2BCoverageSection />
      <B2BTestimonialsSection />
      <B2BFaqSection />
      <B2BFooterLeadSection />
    </div>
  );
}
