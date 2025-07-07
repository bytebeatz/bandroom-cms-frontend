// app/api/units/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/units`,
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("course_id");
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/units?course_id=${courseId}`,
    { headers },
  );

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status });
}
