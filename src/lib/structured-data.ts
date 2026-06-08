import { site } from "@content/site";
import type {
  AboutPage,
  ContactPage,
  ItemList,
  Organization,
  WebSite,
  WithContext,
} from "schema-dts";
import type { BeerData } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

const CERVEZAS_ITEM_LIST_DESCRIPTION =
  "A cada parche le llega su Jabato. Cervezas artesanales hechas en Colombia: IPA, porter, amber y blond para cada momento.";

const ORGANIZATION_ID = "#organization";

export function getOrganizationSchema(): WithContext<Organization> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/${ORGANIZATION_ID}`,
    name: "Jabato Cervecería",
    description:
      "Cervecería artesanal colombiana especializada en cervezas de alta calidad elaboradas en lotes pequeños.",
    url: siteUrl,
    logo: `${siteUrl}/jabato-horizontal-logo.svg`,
    foundingDate: "2021",
    founder: {
      "@type": "Person",
      name: "Jorge González",
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

export function getHistoriaPageSchema(): WithContext<AboutPage> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Nuestra Historia - Jabato Cervecería",
    description:
      "Descubre la historia de Jabato, desde nuestros inicios como homebrewers en 2020 hasta convertirnos en una cervecería artesanal reconocida en Colombia.",
    url: `${siteUrl}/historia`,
    mainEntity: {
      "@type": "Organization",
      name: "Jabato Cervecería",
      foundingDate: "2022",
      founder: {
        "@type": "Person",
        name: "Jorge González",
      },
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

export function getContactPageSchema(): WithContext<ContactPage> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto - Jabato Cervecería",
    description:
      "Ponte en contacto con Jabato Cervecería. Consultas sobre distribución, colaboraciones y más.",
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
