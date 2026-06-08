import { z } from "zod";
import { isValidBirthDate } from "@/lib/age-gate";

const currentYear = new Date().getFullYear();

export const verifyAgeSchema = z
  .object({
    day: z.coerce
      .number()
      .int("El día debe ser un número entero")
      .min(1, "El día debe ser entre 1 y 31")
      .max(31, "El día debe ser entre 1 y 31"),
    month: z.coerce
      .number()
      .int("El mes debe ser un número entero")
      .min(1, "El mes debe ser entre 1 y 12")
      .max(12, "El mes debe ser entre 1 y 12"),
    year: z.coerce
      .number()
      .int("El año debe ser un número entero")
      .min(currentYear - 99, "El año no es válido")
      .max(currentYear, "El año no puede ser en el futuro"),
  })
  .refine(({ day, month, year }) => isValidBirthDate(day, month, year), {
    message: "Fecha de nacimiento inválida",
  });

export type VerifyAgeInput = z.infer<typeof verifyAgeSchema>;

export type AgeGateFormData = {
  day: string;
  month: string;
  year: string;
};

export type AgeGateFormState = {
  success: boolean;
  denied?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: AgeGateFormData;
};
