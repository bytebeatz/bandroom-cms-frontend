import { jwtVerify, JWTPayload } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("Missing JWT_SECRET in environment");
}

const encoder = new TextEncoder();
const secretKey = encoder.encode(secret);

/**
 * Verifies a JWT token using HS256 and returns the payload if valid.
 */
export async function verifyJwt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    console.warn("Invalid JWT:", err);
    return null;
  }
}
