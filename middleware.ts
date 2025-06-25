// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const decoded = verifyJWT(token);

  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard/admin");

  if (isProtected && !decoded) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isAdminRoute && decoded?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url)); // unauthorized
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
