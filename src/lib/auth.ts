import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminUserSession } from "./types";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "madar-logistics-default-jwt-secret-key-2025"
);

const COOKIE_NAME = "madar_admin_session";

export async function createSessionToken(payload: AdminUserSession): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<AdminUserSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: (payload.role as string) || "ADMIN",
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession(): Promise<AdminUserSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

export function getSessionCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}
