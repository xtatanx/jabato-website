"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitVerifyAge } from "@/app/(app)/actions/age-gate";
import {
  COLOMBIA_FOOTNOTE,
  DENIED_MESSAGE,
  DENIED_TITLE,
  MIN_AGE,
} from "@/lib/age-gate";
import { cn } from "@/lib/utils";
import type { AgeGateFormState } from "@/lib/validations/age-gate";

function NumericField({
  id,
  name,
  label,
  placeholder,
  defaultValue,
  min,
  max,
  error,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  min: number;
  max: number;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
        aria-invalid={Boolean(error)}
        className={cn(
          "h-14 w-full border-2 border-black bg-white px-2 text-center text-xl font-bold tabular-nums outline-none transition-colors placeholder:text-black/30 focus:border-brand",
          error && "border-destructive focus:border-destructive",
        )}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-14 w-full bg-black text-lg font-bold uppercase tracking-wider text-white transition-colors hover:bg-black/85 disabled:opacity-70"
    >
      {pending ? "Verificando..." : "Entrar"}
    </button>
  );
}

function AgeGateLogo() {
  return (
    <Image
      src="/jabato-horizontal-logo.svg"
      alt="Jabato Cervecería"
      width={180}
      height={54}
      className="mx-auto"
      priority
    />
  );
}

function AgeGateForm({
  onMinorExit,
  onDeniedRetry,
}: {
  onMinorExit: () => void;
  onDeniedRetry: () => void;
}) {
  const router = useRouter();
  const [state, formAction] = useActionState<AgeGateFormState | null, FormData>(
    submitVerifyAge,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state?.success, router]);

  if (state?.denied) {
    return (
      <div className="w-full max-w-lg space-y-8 text-center">
        <AgeGateLogo />
        <h1
          id="age-gate-title"
          className="font-heading text-4xl uppercase tracking-wide sm:text-5xl"
        >
          {DENIED_TITLE}
        </h1>
        <p id="age-gate-denied-description" className="text-muted-foreground">
          {DENIED_MESSAGE}
        </p>
        <button
          type="button"
          onClick={onDeniedRetry}
          className="text-sm underline-offset-4 hover:underline"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg space-y-8 text-center">
      <AgeGateLogo />

      <div className="space-y-2">
        <h1
          id="age-gate-title"
          className="font-heading text-4xl uppercase leading-none sm:text-6xl"
        >
          ¿Tienes {MIN_AGE} años o más?
        </h1>
        <p id="age-gate-description" className="text-sm font-medium text-brand">
          (debes ser mayor de {MIN_AGE} para entrar)
        </p>
      </div>

      <form
        action={formAction}
        className="space-y-6"
        key={`${state?.data?.day ?? ""}-${state?.data?.month ?? ""}-${state?.data?.year ?? ""}`}
      >
        <fieldset>
          <legend className="sr-only">Fecha de nacimiento</legend>
          <div className="grid grid-cols-3 gap-3">
            <NumericField
              id="age-gate-day"
              name="day"
              label="Día"
              placeholder="DD"
              defaultValue={state?.data?.day}
              min={1}
              max={31}
              error={state?.errors?.day?.[0]}
            />
            <NumericField
              id="age-gate-month"
              name="month"
              label="Mes"
              placeholder="MM"
              defaultValue={state?.data?.month}
              min={1}
              max={12}
              error={state?.errors?.month?.[0]}
            />
            <NumericField
              id="age-gate-year"
              name="year"
              label="Año"
              placeholder="AAAA"
              defaultValue={state?.data?.year}
              min={1900}
              max={new Date().getFullYear()}
              error={state?.errors?.year?.[0]}
            />
          </div>
        </fieldset>

        {state?.message && (
          <p className="text-sm text-destructive" role="alert">
            {state.message}
          </p>
        )}

        <SubmitButton />
      </form>

      <p className="text-xs text-muted-foreground">{COLOMBIA_FOOTNOTE}</p>

      <button
        type="button"
        onClick={onMinorExit}
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        No soy mayor de edad
      </button>
    </div>
  );
}

export function AgeGateClient() {
  const [formKey, setFormKey] = useState(0);
  const [showMinorExit, setShowMinorExit] = useState(false);

  if (showMinorExit) {
    return (
      <div className="w-full max-w-lg space-y-8 text-center">
        <AgeGateLogo />
        <h1
          id="age-gate-title"
          className="font-heading text-4xl uppercase tracking-wide sm:text-5xl"
        >
          {DENIED_TITLE}
        </h1>
        <p id="age-gate-denied-description" className="text-muted-foreground">
          {DENIED_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <AgeGateForm
      key={formKey}
      onMinorExit={() => setShowMinorExit(true)}
      onDeniedRetry={() => setFormKey((key) => key + 1)}
    />
  );
}
