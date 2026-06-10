export const ANALYTICS_CONSENT_COOKIE = "analytics_consent";
export const ANALYTICS_CONSENT_MAX_AGE = 365 * 24 * 60 * 60;

export type AnalyticsConsentValue = "granted" | "denied";

export function getAnalyticsConsentCookieOptions(
  _value: AnalyticsConsentValue,
) {
  return {
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: ANALYTICS_CONSENT_MAX_AGE,
    path: "/",
  };
}

export function parseAnalyticsConsent(
  value: string | undefined,
): AnalyticsConsentValue | null {
  if (value === "granted" || value === "denied") {
    return value;
  }
  return null;
}

export function readAnalyticsConsentFromDocument(): AnalyticsConsentValue | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${ANALYTICS_CONSENT_COOKIE}=`));

  if (!match) {
    return null;
  }

  return parseAnalyticsConsent(match.split("=")[1]);
}

export function setAnalyticsConsentCookie(value: AnalyticsConsentValue) {
  const { sameSite, secure, maxAge, path } =
    getAnalyticsConsentCookieOptions(value);
  const secureFlag = secure ? "; Secure" : "";
  document.cookie = `${ANALYTICS_CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=${path}; SameSite=${sameSite}${secureFlag}`;
}

export function clearAnalyticsConsentCookie() {
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `${ANALYTICS_CONSENT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secureFlag}`;
}

export function hasAnalyticsConsent(): boolean {
  return readAnalyticsConsentFromDocument() === "granted";
}
