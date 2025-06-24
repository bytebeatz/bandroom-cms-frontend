import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "access_token",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}
