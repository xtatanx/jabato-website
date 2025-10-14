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
  testimonials: Testimonial[];
  available: boolean;
}

export const beersData: BeerData[] = [
  {
    id: 'american-amber-ale',
    name: 'American Amber Ale',
    slug: 'american-amber-ale',
    style: 'American Amber Ale',
    description:
      'Nuestra cerveza tipo American Amber Ale artesanal representa el equilibrio perfecto entre la tradición cervecera americana y la innovación artesanal colombiana. Esta cerveza artesanal combina magistralmente la dulzura del caramelo con un amargor equilibrado, creando un perfil de sabor complejo pero accesible que invita a repetir. Elaborada en lotes pequeños con ingredientes cuidadosamente seleccionados, cada sorbo revela capas de sabor que van desde notas tostadas hasta toques cítricos sutiles. Ideal para quienes aprecian una cerveza artesanal versátil que complementa perfectamente desde una tarde casual hasta una comida especial. Hecha en Colombia con pasión y dedicación artesanal.',
    shortDescription:
      'Cerveza artesanal tipo American Amber Ale con equilibrio perfecto.',
    abv: 5.5,
    ibu: 25,
    volume: '330ml',
    images: {
      main: '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
      thumbnails: [
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
      ],
    },
    packs: {
      '6-bottles': {
        price: 60000,
        unitPrice: 10000,
      },
      '12-bottles': {
        price: 120000,
        unitPrice: 10000,
      },
      '24-bottles': {
        price: 240000,
        unitPrice: 10000,
      },
    },
    ingredients: {
      malts: ['Pale Ale', 'Caramelo', 'Crystal'],
      hops: ['Cascade', 'Centennial', 'Amarillo'],
      yeast: 'American Ale',
    },
    pairing: [
      'Hamburguesas',
      'Parrilla',
      'Quesos maduros',
      'Pizza',
      'Pasta',
      'Carne asada',
      'Patatas fritas caseras',
    ],
    testimonials: [
      {
        quote:
          'La American Amber Ale de Jabato es simplemente excepcional. El equilibrio perfecto entre sabor y calidad artesanal.',
        author: 'Carlos Rodríguez',
        position: 'Gerente General, Bar El Refugio',
        avatar: '/placeholder-avatar.jpg',
      },
      {
        quote:
          'Esta Amber Ale se ha convertido en la favorita de mis clientes. Perfecta para acompañar nuestras carnes a la parrilla.',
        author: 'Ana Martínez',
        position: 'Chef Ejecutiva, Asadero La Brasería',
        avatar: '/placeholder-avatar.jpg',
      },
      {
        quote:
          'El carácter maltoso y el final equilibrado la hacen perfecta para cualquier ocasión. Una verdadera joya artesanal.',
        author: 'Luis Gómez',
        position: 'Sommelier de Cerveza Certificado',
        avatar: '/placeholder-avatar.jpg',
      },
    ],
    available: true,
  },
  {
    id: 'belgian-blond-ale',
    name: 'Belgian Blond Ale',
    slug: 'belgian-blond-ale',
    style: 'Belgian Blond Ale',
    description:
      'Descubre nuestra cerveza tipo Belgian Blond Ale artesanal, una interpretación auténtica del estilo belga clásico elaborada en Colombia. Esta cerveza artesanal captura la esencia de la tradición cervecera belga con su carácter especiado distintivo y perfil aromático complejo que transporta tus sentidos. La fermentación con levadura belga tradicional aporta notas especiadas características de clavo y banana, mientras que el final seco y refrescante invita a seguir disfrutando. Una cerveza artesanal sofisticada pero accesible, perfecta para quienes buscan explorar estilos europeos clásicos con calidad artesanal. Elaborada en lotes pequeños con dedicación y respeto por la tradición cervecera belga, pero con alma colombiana.',
    shortDescription:
      'Cerveza artesanal tipo Belgian Blond Ale con carácter especiado único.',
    abv: 6.5,
    ibu: 20,
    volume: '330ml',
    images: {
      main: '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
      thumbnails: [
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
      ],
    },
    packs: {
      '6-bottles': {
        price: 24000,
        unitPrice: 4000,
      },
      '12-bottles': {
        price: 48000,
        unitPrice: 4000,
      },
      '24-bottles': {
        price: 92000,
        unitPrice: 3833,
      },
    },
    ingredients: {
      malts: ['Pilsner', 'Pale Ale', 'Trigo'],
      hops: ['Saaz', 'Hallertau'],
      yeast: 'Belgian Ale',
    },
    pairing: [
      'Moules frites',
      'Quesos suaves',
      'Ensaladas',
      'Pescado blanco',
      'Pollo',
      'Mariscos',
      'Frutas frescas',
    ],
    testimonials: [
      {
        quote:
          'La Belgian Blond Ale de Jabato captura perfectamente el estilo belga tradicional con un toque colombiano único.',
        author: 'María González',
        position: 'Propietaria, Restaurante La Cervecería',
        avatar: '/placeholder-avatar.jpg',
      },
      {
        quote:
          'Las notas especiadas y el final seco hacen de esta cerveza una experiencia memorable. Mis clientes la adoran.',
        author: 'Pedro Sánchez',
        position: 'Bartender Profesional, Tap House Central',
        avatar: '/placeholder-avatar.jpg',
      },
      {
        quote:
          'Una Belgian Blond excepcional que rivaliza con las mejores importadas. Orgullosamente colombiana y artesanal.',
        author: 'Diana Torres',
        position: 'Crítica de Cerveza, Revista Cerveza Artesanal',
        avatar: '/placeholder-avatar.jpg',
      },
    ],
    available: false,
  },
  {
    id: 'west-coast-ipa',
    name: 'West Coast IPA',
    slug: 'west-coast-ipa',
    style: 'West Coast IPA',
    description:
      'Experimenta nuestra cerveza tipo West Coast IPA artesanal, una interpretación audaz del estilo californiano clásico elaborada en Colombia. Esta cerveza artesanal ofrece un perfil lupulado intenso y prominente que explota con aromas cítricos de pomelo y piña tropical, deleitando a los verdaderos amantes del lúpulo. El característico amargor bien definido y el final seco crean una experiencia refrescante y adictiva que te hará querer otro sorbo. Una IPA artesanal sin concesiones, elaborada para quienes buscan intensidad, carácter y complejidad aromática en cada trago. Perfecta para acompañar comidas con especias o simplemente disfrutar en una tarde de exploración cervecera. Hecha en Colombia con lotes pequeños y máxima dedicación artesanal.',
    shortDescription:
      'Cerveza artesanal tipo West Coast IPA con intenso perfil lupulado.',
    abv: 6.0,
    ibu: 65,
    volume: '330ml',
    images: {
      main: '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
      thumbnails: [
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
        '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
      ],
    },
    packs: {
      '6-bottles': {
        price: 23000,
        unitPrice: 3833,
      },
      '12-bottles': {
        price: 46000,
        unitPrice: 3833,
      },
      '24-bottles': {
        price: 88000,
        unitPrice: 3667,
      },
    },
    ingredients: {
      malts: ['Pale Ale', 'Crystal Light'],
      hops: ['Citra', 'Mosaic', 'Simcoe', 'Centennial'],
      yeast: 'American Ale',
    },
    pairing: [
      'Comida picante',
      'Curry indio',
      'Tacos mexicanos',
      'BBQ',
      'Quesos fuertes',
      'Pizza picante',
      'Wings de pollo',
    ],
    testimonials: [
      {
        quote:
          'Esta West Coast IPA es brutal. El amargor está perfectamente balanceado y los aromas cítricos son increíbles.',
        author: 'Javier Martínez',
        position: 'Sommelier, Hotel Boutique Plaza',
        avatar: '/placeholder-avatar.jpg',
      },
      {
        quote:
          'Para los amantes del lúpulo, esta IPA es un sueño hecho realidad. Intensa, refrescante y llena de carácter.',
        author: 'Camila Restrepo',
        position: 'Fundadora, Club de Cerveceros de Medellín',
        avatar: '/placeholder-avatar.jpg',
      },
      {
        quote:
          'La West Coast IPA de Jabato demuestra que Colombia puede producir IPAs de nivel mundial. Simplemente espectacular.',
        author: 'Roberto Vargas',
        position: 'Juez Certificado BJCP',
        avatar: '/placeholder-avatar.jpg',
      },
    ],
    available: false,
  },
];

export function getBeerBySlug(slug: string): BeerData | null {
  return beersData.find((beer) => beer.slug === slug) || null;
}

export function getAllBeers(): BeerData[] {
  return beersData;
}

export function getAvailableBeers(): BeerData[] {
  return beersData.filter((beer) => beer.available);
}
