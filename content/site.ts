export const site = {
  name: "Jabato",
  tagline:
    "A cada parche le llega su Jabato. Cervezas artesanales hechas en Colombia, elaboradas en lotes pequeños.",
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
  defaultOgImage: "/american-amber-ale-hero.jpg",
  showQuotes: false,
} as const;

export type Site = typeof site;
