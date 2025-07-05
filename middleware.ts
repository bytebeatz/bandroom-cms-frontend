import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

const PUBLIC_PATHS = ["/", "/auth/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;

  // Allow public routes without auth
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Only protect `/dashboard` routes
  if (pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const payload = await verifyJwt(accessToken);
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}
