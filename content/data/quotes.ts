import type { Quote } from "@/lib/content/schemas";

export const quotes: readonly Quote[] = [
  {
    id: "pedro-amber",
    type: "american amber ale",
    quote:
      "La American Amber Ale de Jabato me sorprendió: balance perfecto entre maltas y lúpulos. Desde que la probé, no la quito de la nevera.",
    author: {
      name: "Pedro Restrepo",
      position: "Cervecero aficionado",
    },
  },
  {
    id: "lucia-ipa",
    type: "west coast ipa",
    quote:
      "Una IPA con carácter, amargor justo y un final cítrico que invita a la siguiente. La mejor que he probado en Bogotá.",
    author: {
      name: "Lucía Vélez",
      position: "Bartender",
    },
  },
  {
    id: "andres-blond",
    type: "belgian blond ale",
    quote:
      "La Blond es elegante y muy fácil de tomar. Perfecta para arrancar la noche con buen sabor.",
    author: {
      name: "Andrés Caro",
      position: "Beergeek",
    },
  },
  {
    id: "mariana-general",
    type: "general",
    quote: "Cada Jabato cuenta una historia. Se nota la pasión en cada lote.",
    author: {
      name: "Mariana López",
      position: "Cliente fiel",
    },
  },
] as const;
