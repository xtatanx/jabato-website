'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitContactForm } from '@/app/(app)/actions/contact';
import type { ContactFormState } from '@/lib/validations/contact';

function SubmitButton({ isPending }: { isPending: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-brand hover:bg-brand/90"
      disabled={pending || isPending}
    >
      {pending || isPending ? 'Enviando...' : 'Enviar mensaje'}
    </Button>
  );
}

function ContactFormInner() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction, isPending] = useActionState<
    ContactFormState | null,
    FormData
  >(async (prevState: ContactFormState | null, formData: FormData) => {
    // Skip reCAPTCHA in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!isDevelopment) {
      if (!executeRecaptcha) {
        return {
          success: false,
          message:
            'reCAPTCHA no está disponible. Por favor, recarga la página.',
        };
      }

      try {
        const recaptchaToken = await executeRecaptcha('contact_form');
        formData.set('recaptchaToken', recaptchaToken);
      } catch (error) {
        console.error('reCAPTCHA execution failed:', error);
        return {
          success: false,
          message:
            'Error al ejecutar reCAPTCHA. Por favor, inténtalo de nuevo.',
        };
      }
    } else {
      // In development, set a dummy token
      formData.set('recaptchaToken', 'dev-skip-recaptcha');
    }

    return await submitContactForm(prevState, formData);
  }, null);

  return (
    <div className="w-full">
      <form action={formAction} className="space-y-8">
        {/* Success/Error Messages */}
        {state?.message && (
          <div
            className={`p-4 rounded-lg ${
              state.success
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {state.message}
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="firstName">Nombre *</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={state?.data?.firstName ?? ''}
              className={state?.errors?.firstName ? 'border-red-500' : ''}
              disabled={isPending}
            />
            {state?.errors?.firstName && (
              <p className="text-sm text-red-600">
                {state.errors.firstName[0]}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="lastName">Apellido *</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={state?.data?.lastName ?? ''}
              className={state?.errors?.lastName ? 'border-red-500' : ''}
              disabled={isPending}
            />
            {state?.errors?.lastName && (
              <p className="text-sm text-red-600">{state.errors.lastName[0]}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state?.data?.email ?? ''}
            className={state?.errors?.email ? 'border-red-500' : ''}
            disabled={isPending}
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Phone and Company Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={state?.data?.phone ?? ''}
              disabled={isPending}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              name="company"
              type="text"
              defaultValue={state?.data?.company ?? ''}
              disabled={isPending}
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <Label htmlFor="subject">Asunto *</Label>
          <Select
            name="subject"
            disabled={isPending}
            defaultValue={state?.data?.subject}
          >
            <SelectTrigger
              className={state?.errors?.subject ? 'border-red-500' : ''}
            >
              <SelectValue placeholder="Selecciona un asunto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consulta-general">Consulta general</SelectItem>
              <SelectItem value="distribucion">Distribución</SelectItem>
              <SelectItem value="colaboraciones">Colaboraciones</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.subject && (
            <p className="text-sm text-red-600">{state.errors.subject[0]}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje *</Label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            defaultValue={state?.data?.message ?? ''}
            className={state?.errors?.message ? 'border-red-500' : ''}
            disabled={isPending}
            placeholder="Cuéntanos cómo podemos ayudarte..."
          />
          {state?.errors?.message && (
            <p className="text-sm text-red-600">{state.errors.message[0]}</p>
          )}
        </div>

        {/* Hidden reCAPTCHA token field */}
        <input type="hidden" name="recaptchaToken" />

        {/* Submit Button */}
        <SubmitButton isPending={isPending} />
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
}
