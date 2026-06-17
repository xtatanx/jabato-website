export interface B2bFaqItem {
  question: string;
  answer: string;
}

export const b2bFaqItems: B2bFaqItem[] = [
  {
    question: "¿Cuál es el pedido mínimo para envío gratis?",
    answer: "A partir de una caja de 24 unidades.",
  },
  {
    question: "¿Qué días entregan en Bogotá?",
    answer:
      "Los jueves y sábados. Si necesitas otra fecha, escríbenos y buscamos la mejor opción para ti.",
  },
  {
    question:
      "¿Proveen o facilitan equipos de barril o sistemas de enfriamiento?",
    answer:
      "¡Sí! Según tu volumen de compra, podemos instalar un chiller en tu bar o restaurante.",
  },
];
