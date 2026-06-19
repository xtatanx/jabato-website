"use client";

import { b2bLandingCopy } from "@content/data/b2b-landing";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitWholesaleLeadForm } from "@/lib/actions/wholesale-lead";
import {
  trackWholesaleFormStart,
  trackWholesaleLeadSubmit,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { getUtmAttribution, UTM_PARAM_KEYS } from "@/lib/utm-attribution";
import type { WholesaleLeadFormState } from "@/lib/validations/wholesale-lead";

interface WholesaleLeadFormProps {
  className?: string;
}

function RequiredMark() {
  return (
    <span className="text-red-600" aria-hidden="true">
      *
    </span>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="h-14 w-full text-xl bg-brand hover:bg-brand/90"
      disabled={pending || isPending}
    >
      {pending || isPending ? "Enviando..." : b2bLandingCopy.formCta}
    </Button>
  );
}

function attachAttributionToFormData(formData: FormData) {
  const attribution = getUtmAttribution();

  for (const key of UTM_PARAM_KEYS) {
    const value = attribution[key];
    if (value) {
      formData.set(key, value);
    }
  }
}

function WholesaleLeadFormInner({ className }: WholesaleLeadFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const hasTrackedFormStartRef = useRef(false);
  const [state, formAction, isPending] = useActionState<
    WholesaleLeadFormState | null,
    FormData
  >(async (prevState, formData) => {
    const isDevelopment = process.env.NODE_ENV === "development";

    attachAttributionToFormData(formData);

    if (!isDevelopment) {
      if (!executeRecaptcha) {
        return {
          success: false,
          message:
            "reCAPTCHA no está disponible. Por favor, recarga la página.",
        };
      }

      try {
        const recaptchaToken = await executeRecaptcha("wholesale_lead_form");
        formData.set("recaptchaToken", recaptchaToken);
      } catch (error) {
        console.error("reCAPTCHA execution failed:", error);
        return {
          success: false,
          message:
            "Error al ejecutar reCAPTCHA. Por favor, inténtalo de nuevo.",
        };
      }
    } else {
      formData.set("recaptchaToken", "dev-skip-recaptcha");
    }

    return await submitWholesaleLeadForm(prevState, formData);
  }, null);

  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (state?.success && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackWholesaleLeadSubmit();
    }
  }, [state?.success]);

  const handleFormStart = () => {
    if (hasTrackedFormStartRef.current) {
      return;
    }

    hasTrackedFormStartRef.current = true;
    trackWholesaleFormStart();
  };

  if (state?.success) {
    return (
      <Card
        className={cn("border-green-200 bg-green-50 shadow-2xl", className)}
      >
        <CardContent className="p-8 text-green-900">
          <p className="text-xl font-semibold">{state.message}</p>
          <p className="mt-2 text-base lg:text-lg">
            Te respondemos en menos de 24 horas por teléfono o WhatsApp.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "border-white/20 bg-white shadow-2xl ring-2 ring-white/10",
        className,
      )}
    >
      <CardHeader className="px-8 pb-2 pt-8">
        <CardTitle className="text-foreground text-center font-sans text-2xl font-bold normal-case leading-snug sm:text-3xl">
          {b2bLandingCopy.formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form action={formAction} className="space-y-5">
          {state?.message && !state.success && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-base text-red-800">
              {state.message}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-base lg:text-lg">
              Nombre completo <RequiredMark />
            </Label>
            <Input
              id="fullName"
              name="fullName"
              required
              defaultValue={state?.data?.fullName ?? ""}
              className={cn(
                "h-14 text-lg",
                state?.errors?.fullName && "border-red-500",
              )}
              disabled={isPending}
              placeholder="Tu nombre"
              onFocus={handleFormStart}
            />
            {state?.errors?.fullName && (
              <p className="text-base text-red-600">
                {state.errors.fullName[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base lg:text-lg">
              Teléfono / WhatsApp <RequiredMark />
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              defaultValue={state?.data?.phone ?? ""}
              className={cn(
                "h-14 text-lg",
                state?.errors?.phone && "border-red-500",
              )}
              disabled={isPending}
              placeholder="Tu teléfono"
              onFocus={handleFormStart}
            />
            {state?.errors?.phone && (
              <p className="text-base text-red-600">{state.errors.phone[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="venueName" className="text-base lg:text-lg">
              Nombre del establecimiento <RequiredMark />
            </Label>
            <Input
              id="venueName"
              name="venueName"
              required
              defaultValue={state?.data?.venueName ?? ""}
              className={cn(
                "h-14 text-lg",
                state?.errors?.venueName && "border-red-500",
              )}
              disabled={isPending}
              placeholder="El nombre de tu establecimiento"
              onFocus={handleFormStart}
            />
            {state?.errors?.venueName && (
              <p className="text-base text-red-600">
                {state.errors.venueName[0]}
              </p>
            )}
          </div>

          <input type="hidden" name="recaptchaToken" />
          <SubmitButton isPending={isPending} />
        </form>
      </CardContent>
    </Card>
  );
}

export function WholesaleLeadForm({ className }: WholesaleLeadFormProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <WholesaleLeadFormInner className={className} />
    </GoogleReCaptchaProvider>
  );
}
