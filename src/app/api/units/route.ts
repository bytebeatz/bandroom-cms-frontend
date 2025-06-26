// src/app/api/units/route.ts

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  const res = await fetch(`${process.env.CMS_API_URL}/api/units`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  return new Response(text, { status: res.status });
}
