"use server";

import { Resend } from "resend";
import { requireAgeVerified } from "@/lib/age-gate-server";
import {
  type ContactFormData,
  type ContactFormState,
  contactFormSchema,
} from "@/lib/validations/contact";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY not found");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();

    // Score threshold: 0.5 (higher is more likely human)
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
}

function getSubjectLabel(subject: string): string {
  const subjectMap: Record<string, string> = {
    "consulta-general": "Consulta general",
    distribucion: "Distribución",
    colaboraciones: "Colaboraciones",
    otro: "Otro",
  };
  return subjectMap[subject] || subject;
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    await requireAgeVerified();
  } catch {
    return {
      success: false,
      message: "Debes verificar tu edad para enviar el formulario.",
    };
  }

  try {
    // Extract form data
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      recaptchaToken: formData.get("recaptchaToken") as string,
    };

    // Validate with Zod
    const validationResult = contactFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors: Record<string, string[]> = {};

      validationResult.error.issues.forEach((error) => {
        const field = error.path[0] as string;
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(error.message);
      });

      return {
        success: false,
        message: "Por favor corrige los errores en el formulario",
        errors,
        data: rawData,
      };
    }

    const data = validationResult.data;

    // Verify reCAPTCHA (skip in development)
    const isDevelopment = process.env.NODE_ENV === "development";
    console.log("isDevelopment", isDevelopment);

    if (!isDevelopment) {
      if (!data.recaptchaToken) {
        return {
          success: false,
          message: "Token de reCAPTCHA es requerido.",
          data: rawData,
        };
      }

      const isRecaptchaValid = await verifyRecaptcha(data.recaptchaToken);
      if (!isRecaptchaValid) {
        return {
          success: false,
          message:
            "Verificación de reCAPTCHA falló. Por favor, inténtalo de nuevo.",
          data: rawData,
        };
      }
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error("CONTACT_EMAIL is not configured");
      return {
        success: false,
        message: "Error interno del servidor. Por favor, inténtalo de nuevo.",
        data: data,
      };
    }

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin: 0 0 10px 0;">Nuevo mensaje de contacto - Jabato Cervecería</h2>
          <p style="color: #666; margin: 0;">Formulario de contacto del sitio web</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Información del contacto</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Nombre:</td>
              <td style="padding: 8px 0; color: #333;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0; color: #333;">
                <a href="mailto:${data.email}" style="color: #007bff; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            ${
              data.phone
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Teléfono:</td>
              <td style="padding: 8px 0; color: #333;">${data.phone}</td>
            </tr>
            `
                : ""
            }
            ${
              data.company
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Empresa:</td>
              <td style="padding: 8px 0; color: #333;">${data.company}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Asunto:</td>
              <td style="padding: 8px 0; color: #333;">${getSubjectLabel(data.subject)}</td>
            </tr>
          </table>
          
          <h3 style="color: #333; margin-top: 20px;">Mensaje</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
            <p style="margin: 0; color: #333; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            Este mensaje fue enviado desde el formulario de contacto de 
            <a href="https://jabato.com.co" style="color: #007bff; text-decoration: none;">jabato.com.co</a>
          </p>
        </div>
      </div>
    `;

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: "Jabato Contacto <noreply@jabato.com.co>",
      to: [contactEmail],
      subject: `Nuevo mensaje de contacto: ${getSubjectLabel(data.subject)} - ${data.firstName} ${data.lastName}`,
      html: emailHtml,
      replyTo: data.email,
    });

    if (emailData.error) {
      console.error("Error sending email:", emailData.error);
      return {
        success: false,
        message: "Error al enviar el email. Por favor, inténtalo de nuevo.",
        data: data,
      };
    }

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Te responderemos pronto.",
      data: { subject: data.subject },
    };
  } catch (error) {
    console.error("Error processing contact form:", error);

    // Extract form data from the error context if available
    let extractedData: Partial<ContactFormData> = {};
    try {
      extractedData = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      };
    } catch {
      // If we can't extract form data, just return empty object
    }

    return {
      success: false,
      message: "Error interno del servidor. Por favor, inténtalo de nuevo.",
      data: extractedData,
    };
  }
}
