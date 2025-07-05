// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/courses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();

  return new NextResponse(JSON.stringify(data), { status: res.status });
}
