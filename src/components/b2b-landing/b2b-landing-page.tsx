import { B2BFaqSection } from "@/components/b2b-landing/b2b-faq-section";
import { B2BHeroSection } from "@/components/b2b-landing/b2b-hero-section";
import { B2BLandingAnalytics } from "@/components/b2b-landing/b2b-landing-analytics";
import { B2BProductPortfolio } from "@/components/b2b-landing/b2b-product-portfolio";
import { B2BTastingCta } from "@/components/b2b-landing/b2b-tasting-cta";
import { B2BValueProps } from "@/components/b2b-landing/b2b-value-props";
import type { BeerData } from "@/lib/content";

interface B2BLandingPageProps {
  beers: BeerData[];
}

export function B2BLandingPage({ beers }: B2BLandingPageProps) {
  return (
    <>
      <B2BLandingAnalytics />
      <B2BHeroSection />
      <B2BValueProps />
      <B2BProductPortfolio beers={beers} />
      <B2BTastingCta />
      <B2BFaqSection />
    </>
  );
}
