// src/app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE() {
  const cookieStore = await cookies();

  // Clear the token
  cookieStore.set("access_token", "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Expire immediately
  });

  return NextResponse.json({ success: true });
}
