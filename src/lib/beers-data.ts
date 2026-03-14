import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatar?: string;
}

export interface BeerData {
  id: string;
  name: string;
  slug: string;
  style: string;
  description: string;
  shortDescription: string;
  abv: number;
  ibu: number;
  volume: string;
  images: {
    main: string;
    thumbnails: string[];
  };
  packs: {
    '6-bottles': {
      price: number;
      unitPrice: number;
    };
    '12-bottles': {
      price: number;
      unitPrice: number;
    };
    '24-bottles': {
      price: number;
      unitPrice: number;
    };
  };
  ingredients: {
    malts: string[];
    hops: string[];
    yeast?: string;
  };
  pairing: string[];
  testimonialsSectionTitle?: DefaultTypedEditorState | null;
  testimonials: Testimonial[];
  available: boolean;
  whyChoose?: string;
  servingAndStorage?: string;
}
