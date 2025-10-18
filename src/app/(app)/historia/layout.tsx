import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestra Historia',
  description:
    'Descubre la historia de Jabato, desde nuestros inicios como homebrewers hasta convertirnos en una cervecería artesanal reconocida en Colombia.',
  alternates: {
    canonical: 'https://jabato.com.co/historia',
  },
  openGraph: {
    title: 'Nuestra Historia | Jabato Cervecería',
    description:
      'De un balde plástico y mucha pasión a una cervecería artesanal. Descubre el camino de Jabato desde 2020 hasta hoy.',
    url: 'https://jabato.com.co/historia',
    siteName: 'Jabato Cervecería',
    images: [
      {
        url: 'https://jabato.com.co/equipo-homebrewer-de-jabato-en-sus-inicios.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo Homebrewer de Jabato en sus inicios',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestra Historia | Jabato Cervecería',
    description:
      'De un balde plástico y mucha pasión a una cervecería artesanal. Descubre el camino de Jabato.',
    images: [
      'https://jabato.com.co/equipo-homebrewer-de-jabato-en-sus-inicios.jpg',
    ],
  },
};

export default function HistoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
