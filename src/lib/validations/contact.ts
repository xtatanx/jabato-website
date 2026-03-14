import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  lastName: z
    .string()
    .min(1, "El apellido es requerido")
    .max(50, "El apellido no puede exceder 50 caracteres"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Ingresa un email válido")
    .max(100, "El email no puede exceder 100 caracteres"),
  phone: z
    .string()
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(100, "La empresa no puede exceder 100 caracteres")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(1, "El asunto es requerido")
    .refine(
      (val) =>
        ["consulta-general", "distribucion", "colaboraciones", "otro"].includes(
          val,
        ),
      "Selecciona un asunto válido",
    ),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
  recaptchaToken: z
    .string()
    .min(1, "Token de reCAPTCHA es requerido")
    .optional()
    .or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: Partial<ContactFormData>;
};
