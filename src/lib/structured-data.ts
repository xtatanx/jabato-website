import type { WithContext, AboutPage, Organization } from 'schema-dts';

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jabato Cervecería',
    description:
      'Cervecería artesanal colombiana especializada en cervezas de alta calidad elaboradas en lotes pequeños.',
    url: 'https://jabato.com.co',
    logo: 'https://jabato.com.co/jabato-horizontal-logo.svg',
    foundingDate: '2022',
    founder: {
      '@type': 'Person',
      name: 'Jorge González',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressLocality: 'Colombia',
    },
    sameAs: [
      'https://instagram.com/jabato',
      'https://facebook.com/jabato',
      'https://tiktok.com/@jabato',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'jabatocerveceria@gmail.com',
      contactType: 'customer service',
    },
  };
}

export function getHistoriaPageSchema(): WithContext<AboutPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Nuestra Historia - Jabato Cervecería',
    description:
      'Descubre la historia de Jabato, desde nuestros inicios como homebrewers en 2020 hasta convertirnos en una cervecería artesanal reconocida en Colombia.',
    url: 'https://jabato.com.co/historia',
    mainEntity: {
      '@type': 'Organization',
      name: 'Jabato Cervecería',
      foundingDate: '2022',
      founder: {
        '@type': 'Person',
        name: 'Jorge González',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://jabato.com.co',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Historia',
          item: 'https://jabato.com.co/historia',
        },
      ],
    },
  };
}
