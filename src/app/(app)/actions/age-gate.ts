"use server";

import { cookies } from "next/headers";
import { isOfLegalAge } from "@/lib/age-gate";
import {
  AGE_VERIFIED_COOKIE,
  getAgeVerifiedCookieOptions,
} from "@/lib/age-gate-server";
import {
  type AgeGateFormState,
  verifyAgeSchema,
} from "@/lib/validations/age-gate";

function getFormData(formData: FormData) {
  return {
    day: (formData.get("day") as string | null) ?? "",
    month: (formData.get("month") as string | null) ?? "",
    year: (formData.get("year") as string | null) ?? "",
  };
}

export async function submitVerifyAge(
  _prevState: AgeGateFormState | null,
  formData: FormData,
): Promise<AgeGateFormState> {
  const rawData = getFormData(formData);

  if (!rawData.day || !rawData.month || !rawData.year) {
    return {
      success: false,
      message: "Completa tu fecha de nacimiento.",
      data: rawData,
    };
  }

  const validationResult = verifyAgeSchema.safeParse(rawData);

  if (!validationResult.success) {
    const errors: Record<string, string[]> = {};
    let message: string | undefined;

    for (const issue of validationResult.error.issues) {
      const field = issue.path[0];
      if (field === undefined) {
        message = issue.message;
        continue;
      }

      const fieldName = String(field);
      if (!errors[fieldName]) {
        errors[fieldName] = [];
      }
      errors[fieldName].push(issue.message);
    }

    return {
      success: false,
      message: message ?? "Por favor corrige los errores en el formulario.",
      errors: Object.keys(errors).length > 0 ? errors : undefined,
      data: rawData,
    };
  }

  const { day, month, year } = validationResult.data;
  const birthDate = new Date(year, month - 1, day);

  if (!isOfLegalAge(birthDate)) {
    return { success: false, denied: true };
  }

  const cookieStore = await cookies();
  cookieStore.set(AGE_VERIFIED_COOKIE, "1", getAgeVerifiedCookieOptions());

  return { success: true };
}
