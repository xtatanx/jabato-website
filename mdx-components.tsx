import type { MDXComponents } from "mdx/types";
import {
  BeerGrid,
  BusinessCta,
  ContactSection,
  Cta,
  FeatureRow,
  Hero,
  Lede,
  PostGrid,
  Quote,
  Testimonials,
  Timeline,
} from "@/components/content";

const contentComponents = {
  Hero,
  Lede,
  FeatureRow,
  Cta,
  BusinessCta,
  ContactSection,
  Testimonials,
  Quote,
  BeerGrid,
  PostGrid,
  Timeline,
} satisfies MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...contentComponents,
  };
}
