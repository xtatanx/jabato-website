"use server";

import { Resend } from "resend";
import { requireAgeVerified } from "@/lib/age-gate-server";
import { UTM_PARAM_KEYS, type UtmAttribution } from "@/lib/utm-attribution";
import {
  type WholesaleLeadData,
  type WholesaleLeadFormState,
  wholesaleLeadSchema,
} from "@/lib/validations/wholesale-lead";

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
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return false;
  }
}

function getAttributionFromFormData(formData: FormData): UtmAttribution {
  const attribution: UtmAttribution = {};

  for (const key of UTM_PARAM_KEYS) {
    const value = formData.get(key);
    if (typeof value === "string" && value.length > 0) {
      attribution[key] = value;
    }
  }

  return attribution;
}

function buildAttributionEmailRows(attribution: UtmAttribution): string {
  const entries = Object.entries(attribution);
  if (entries.length === 0) {
    return `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Atribución:</td>
              <td style="padding: 8px 0; color: #333;">Sin datos UTM/gclid</td>
            </tr>`;
  }

  return entries
    .map(
      ([key, value]) => `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">${key}:</td>
              <td style="padding: 8px 0; color: #333;">${value}</td>
            </tr>`,
    )
    .join("");
}

export async function submitWholesaleLeadForm(
  prevState: WholesaleLeadFormState | null,
  formData: FormData,
): Promise<WholesaleLeadFormState> {
  try {
    await requireAgeVerified();
  } catch {
    return {
      success: false,
      message: "Debes verificar tu edad para enviar el formulario.",
    };
  }

  try {
    const attribution = getAttributionFromFormData(formData);
    const rawData = {
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      venueName: formData.get("venueName") as string,
      recaptchaToken: formData.get("recaptchaToken") as string,
    };

    const validationResult = wholesaleLeadSchema.safeParse(rawData);

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
    const isDevelopment = process.env.NODE_ENV === "development";

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
        data,
      };
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin: 0 0 10px 0;">Nueva solicitud mayorista - Jabato Cervecería</h2>
          <p style="color: #666; margin: 0;">Landing page /distribucion</p>
        </div>
        <div style="background-color: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 160px;">Nombre:</td>
              <td style="padding: 8px 0; color: #333;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Teléfono:</td>
              <td style="padding: 8px 0; color: #333;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Establecimiento:</td>
              <td style="padding: 8px 0; color: #333;">${data.venueName}</td>
            </tr>
            ${buildAttributionEmailRows(attribution)}
          </table>
        </div>
      </div>
    `;

    const emailData = await resend.emails.send({
      from: "Jabato Contacto <noreply@jabato.com.co>",
      to: [contactEmail],
      subject: `Solicitud mayorista: ${data.venueName} - ${data.fullName}`,
      html: emailHtml,
    });

    if (emailData.error) {
      console.error("Error sending email:", emailData.error);
      return {
        success: false,
        message: "Error al enviar el email. Por favor, inténtalo de nuevo.",
        data,
      };
    }

    return {
      success: true,
      message:
        "¡Listo! Te contactaremos pronto con el portafolio y precios mayoristas.",
      data,
    };
  } catch (error) {
    console.error("Error processing wholesale lead form:", error);

    let extractedData: Partial<WholesaleLeadData> = {};
    try {
      extractedData = {
        fullName: formData.get("fullName") as string,
        phone: formData.get("phone") as string,
        venueName: formData.get("venueName") as string,
      };
    } catch {
      // ignore
    }

    return {
      success: false,
      message: "Error interno del servidor. Por favor, inténtalo de nuevo.",
      data: extractedData,
    };
  }
}
