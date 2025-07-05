import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

/**
 * Returns the JWT payload if a valid access token cookie is present.
 */
export async function getUserFromCookie() {
  const cookieStore = await cookies(); // ✅ required in Next 15+
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  const payload = await verifyJwt(token);
  return payload && typeof payload === "object" ? payload : null;
}

/**
 * Returns the Authorization header for server-side fetches.
 */
export async function getAuthHeaders() {
  const cookieStore = await cookies(); // ✅ must be awaited in Next 15+
  const token = cookieStore.get("access_token")?.value;

  return {
    Authorization: `Bearer ${token}`,
  };
}
