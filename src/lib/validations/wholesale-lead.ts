import { z } from "zod";

export const wholesaleLeadSchema = z.object({
  fullName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  phone: z
    .string()
    .min(7, "Ingresa un teléfono válido")
    .max(20, "El teléfono no puede exceder 20 caracteres"),
  venueName: z
    .string()
    .min(1, "El nombre del establecimiento es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  recaptchaToken: z
    .string()
    .min(1, "Token de reCAPTCHA es requerido")
    .optional()
    .or(z.literal("")),
});

export type WholesaleLeadData = z.infer<typeof wholesaleLeadSchema>;

export type WholesaleLeadFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: Partial<WholesaleLeadData>;
};
