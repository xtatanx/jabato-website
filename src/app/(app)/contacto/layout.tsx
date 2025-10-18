import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Ponte en contacto con Jabato Cervecería. Consultas sobre distribución, colaboraciones y más. Te ayudamos a encontrar la mejor cerveza artesanal.',
  alternates: {
    canonical: 'https://jabato.com.co/contacto',
  },
  openGraph: {
    title: 'Contacto | Jabato Cervecería',
    description:
      'Ponte en contacto con Jabato Cervecería. Consultas sobre distribución, colaboraciones y más.',
    url: 'https://jabato.com.co/contacto',
    siteName: 'Jabato Cervecería',
    images: [
      {
        url: 'https://jabato.com.co/personas-tomando-jabato-amber-ale.png',
        width: 1200,
        height: 630,
        alt: 'Contacto con Jabato Cervecería',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Jabato Cervecería',
    description:
      'Ponte en contacto con Jabato Cervecería. Consultas sobre distribución, colaboraciones y más.',
    images: ['https://jabato.com.co/personas-tomando-jabato-amber-ale.png'],
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
