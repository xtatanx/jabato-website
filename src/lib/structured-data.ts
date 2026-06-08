import type {
  AboutPage,
  ContactPage,
  Organization,
  WithContext,
} from "schema-dts";
import { getSiteUrl } from "@/lib/site-url";

export function getOrganizationSchema(): WithContext<Organization> {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jabato Cervecería",
    description:
      "Cervecería artesanal colombiana especializada en cervezas de alta calidad elaboradas en lotes pequeños.",
    url: siteUrl,
    logo: `${siteUrl}/jabato-horizontal-logo.svg`,
    foundingDate: "2022",
    founder: {
      "@type": "Person",
      name: "Jorge González",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
      addressLocality: "Colombia",
    },
    sameAs: [
      "https://instagram.com/jabato",
      "https://facebook.com/jabato",
      "https://tiktok.com/@jabato",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "jabatocerveceria@gmail.com",
      contactType: "customer service",
    },
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
