import { cookies } from "next/headers";

export const AGE_VERIFIED_COOKIE = "age_verified";
const AGE_VERIFIED_MAX_AGE = 7 * 24 * 60 * 60;

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export function isAgeVerified(cookieStore: CookieStore): boolean {
  return cookieStore.get(AGE_VERIFIED_COOKIE)?.value === "1";
}

export async function requireAgeVerified(): Promise<void> {
  const cookieStore = await cookies();
  if (!isAgeVerified(cookieStore)) {
    throw new Error("AGE_NOT_VERIFIED");
  }
}

export function getAgeVerifiedCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: AGE_VERIFIED_MAX_AGE,
    path: "/",
  };
}
