export const MIN_AGE = 18;

export const LEGAL_DISCLAIMER =
  "Este sitio web contiene información sobre bebidas alcohólicas. Debes ser mayor de 18 años según la legislación colombiana para acceder.";

export const DENIED_TITLE = "Debes ser mayor de 18 años para acceder";

export const DENIED_MESSAGE =
  "Por ley en Colombia, el consumo de alcohol está prohibido para menores de edad. Te invitamos a volver cuando cumplas 18 años.";

export const COLOMBIA_FOOTNOTE =
  "El consumo de alcohol está prohibido para menores de edad en Colombia.";

export function calculateAge(
  birthDate: Date,
  referenceDate = new Date(),
): number {
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export function isValidBirthDate(
  day: number,
  month: number,
  year: number,
): boolean {
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= new Date()
  );
}

export function isOfLegalAge(birthDate: Date): boolean {
  return calculateAge(birthDate) >= MIN_AGE;
}
