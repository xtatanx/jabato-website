import type { Quote } from "@/lib/content/schemas";

export const quotes: readonly Quote[] = [
  {
    id: "javier-gold-pub",
    type: "general",
    quote:
      "Para Gold Pub es fundamental brindar experiencias a nuestros clientes, y sí que lo estamos logrando con ustedes, ¡Jabato! Queremos tomarnos un momento para brindar por ustedes y agradecerles por ser el motor detrás de cada copa llena y cada cliente feliz en nuestro negocio. ¡Salud, Jabato!",
    author: {
      name: "Javier",
      position: "Gold Pub",
    },
  },
  {
    id: "paula-el-cafe",
    type: "american amber ale",
    quote:
      "En lo personal, mi preferida es la Amber Ale. Es una cerveza que tiene cuerpo y fuerza; sus sabores resaltan en el paladar y, además, con carnes rojas combina muy bien. También en tertulia con amigos es una cerveza que puedes tomar y tomar: no te embriaga, no te da dolor de cabeza. Esa es mi experiencia con tu cerveza roja.",
    author: {
      name: "Paula",
      position: "El Café de Paula",
    },
  },
  {
    id: "jonathan-las-alas",
    type: "american amber ale",
    quote:
      "La Amber Ale es muy rica, con mucho porte, sabor irresistible y con muchísimo estilo. La disposición de los chicos y su constante seguimiento a los comentarios de los clientes hacen un match más que perfecto. 100/10.",
    author: {
      name: "Jonathan",
      position: "Las Alas DC",
    },
  },
] as const;
