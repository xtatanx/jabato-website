const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  historias: "Historias",
  catas: "Catas",
  experiencias: "Experiencias",
};

export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  return `${MONTHS_ES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}
