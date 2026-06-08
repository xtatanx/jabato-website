export const site = {
  name: "Jabato",
  baseUrl: "https://jabatocerveceria.com",
  tagline:
    "Cerveza artesanal de principio a fin, sin atajos. Compartimos nuestra pasión por la cerveza con el mundo, creando experiencias únicas en cada sorbo.",
  nav: [
    { href: "/cervezas", label: "Cervezas" },
    { href: "/historia", label: "Historia" },
    { href: "/contacto", label: "Contacto" },
  ],
  socials: {
    instagram: "https://instagram.com/jabato",
    facebook: "https://facebook.com/jabato",
    tiktok: "https://tiktok.com/@jabato",
    untappd: "https://untappd.com/jabato",
  },
  contact: {
    email: "jabatocerveceria@gmail.com",
    whatsapp: "573337058517",
    whatsappDisplay: "+57 333 7058517",
  },
  defaultOgImage: undefined as string | undefined,
} as const;

export type Site = typeof site;
