import { site } from "@content/site";
import type {
  AboutPage,
  BarOrPub,
  BreadcrumbList,
  ContactPage,
  ItemList,
  Organization,
  Product,
  WebSite,
  WithContext,
} from "schema-dts";
import type { BeerData } from "@/lib/content";
import { buildLocationSlug, type Location } from "@/lib/jabato-api";
import { getSiteUrl } from "@/lib/site-url";

const CERVEZAS_ITEM_LIST_DESCRIPTION =
  "A cada parche le llega su Jabato. Cervezas artesanales colombianas: American Amber Ale, West Coast IPA, Porter y Belgian Blond Ale. Encuentra tu Jabato.";

const ORGANIZATION_ID = "#organization";

export function getOrganizationSchema(): WithContext<Organization> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/${ORGANIZATION_ID}`,
    name: "Jabato Cervecería",
    slogan: "A cada parche le llega su Jabato",
    description: site.tagline,
    url: siteUrl,
    logo: `${siteUrl}/jabato-horizontal-logo.svg`,
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: "Jhonnatan González",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
      addressLocality: "Bogotá",
    },
    sameAs: [
      site.socials.instagram,
      site.socials.facebook,
      site.socials.tiktok,
      site.socials.untappd,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: site.contact.email,
      contactType: "customer service",
    },
  };
}

export function getWebSiteSchema(): WithContext<WebSite> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jabato Cervecería",
    url: siteUrl,
    description: site.tagline,
    inLanguage: "es-CO",
    publisher: {
      "@id": `${siteUrl}/${ORGANIZATION_ID}`,
    },
  };
}

export function getBeerProductSchema(beer: BeerData): WithContext<Product> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: beer.title,
    description: beer.seo.description,
    image: beer.images.map((img) => `${siteUrl}${img.src}`),
    brand: {
      "@type": "Brand",
      name: "Jabato Cervecería",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/cervezas/${beer.slug}`,
      priceCurrency: "COP",
      price: beer.pricePerBottle,
      availability: beer.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

export function getBeerBreadcrumbSchema(
  beer: BeerData,
): WithContext<BreadcrumbList> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nuestras cervezas",
        item: `${siteUrl}/cervezas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: beer.title,
        item: `${siteUrl}/cervezas/${beer.slug}`,
      },
    ],
  };
}

export function getCervezasItemListSchema(
  beers: BeerData[],
): WithContext<ItemList> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cervezas artesanales Jabato",
    description: CERVEZAS_ITEM_LIST_DESCRIPTION,
    numberOfItems: beers.length,
    itemListElement: beers.map((beer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: beer.title,
      url: `${siteUrl}/cervezas/${beer.slug}`,
    })),
  };
}

export function getHistoriaPageSchema(
  description: string,
): WithContext<AboutPage> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Nuestra Historia - Jabato Cervecería",
    description,
    url: `${siteUrl}/historia`,
    mainEntity: {
      "@id": `${siteUrl}/${ORGANIZATION_ID}`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Historia",
          item: `${siteUrl}/historia`,
        },
      ],
    },
  };
}

export function getContactPageSchema(
  description: string,
): WithContext<ContactPage> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto - Jabato Cervecería",
    description,
    url: `${siteUrl}/contacto`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contacto",
          item: `${siteUrl}/contacto`,
        },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      name: "Jabato Cervecería",
      email: "jabatocerveceria@gmail.com",
      url: siteUrl,
    },
  };
}

const DONDE_COMPRAR_ITEM_LIST_DESCRIPTION =
  "Encuentra bares y restaurantes en Bogotá y alrededores donde puedes disfrutar cerveza artesanal Jabato.";

export function getDondeComprarItemListSchema(
  locations: Location[],
): WithContext<ItemList> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Puntos de venta Jabato",
    description: DONDE_COMPRAR_ITEM_LIST_DESCRIPTION,
    numberOfItems: locations.length,
    itemListElement: locations.map((loc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: loc.name,
      url: `${siteUrl}/donde-comprar/${buildLocationSlug(loc.id, loc.name)}`,
    })),
  };
}

export function getLocationBusinessSchema(
  loc: Location,
): WithContext<BarOrPub> {
  const siteUrl = getSiteUrl();
  const slug = buildLocationSlug(loc.id, loc.name);

  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: loc.name,
    description: loc.description ?? undefined,
    url: `${siteUrl}/donde-comprar/${slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.location.address,
      addressLocality: loc.location.city,
      addressRegion: loc.location.district,
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.location.coordinates.lat,
      longitude: loc.location.coordinates.lng,
    },
  };
}

export function getLocationBreadcrumbSchema(
  loc: Location,
): WithContext<BreadcrumbList> {
  const siteUrl = getSiteUrl();
  const slug = buildLocationSlug(loc.id, loc.name);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dónde comprar",
        item: `${siteUrl}/donde-comprar`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: loc.name,
        item: `${siteUrl}/donde-comprar/${slug}`,
      },
    ],
  };
}
