import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

/**
 * Returns the JWT payload if a valid access token cookie is present.
 */
export async function getUserFromCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  const payload = await verifyJwt(token);
  return payload && typeof payload === "object" ? payload : null;
}
