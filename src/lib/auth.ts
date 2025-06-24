// lib/auth.ts

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface JwtPayload {
  user_id: string;
  email: string;
  role: "admin" | "user" | string;
  exp: number;
  iat: number;
}

export function verifyJWT(
  token: string,
  checkExpiry: boolean = true,
): JwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set");

    const decoded = jwt.verify(token, secret, {
      ignoreExpiration: !checkExpiry,
    });

    return decoded as JwtPayload;
  } catch (err) {
    console.warn("JWT verification failed:", err);
    return null;
  }
}

/**
 * Async function to extract user from cookies. Use this ONLY in server components.
 */
export async function getCurrentUserFromCookies(): Promise<JwtPayload | null> {
  const cookieStore = cookies(); // Safe inside async server function
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;

  return verifyJWT(token);
}

export async function isAdminFromCookies(): Promise<boolean> {
  const user = await getCurrentUserFromCookies();
  return user?.role === "admin";
}
