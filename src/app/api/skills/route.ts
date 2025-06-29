// src/app/api/skills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = await getAccessTokenFromCookies();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${process.env.CMS_API_URL}/api/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status });
}
