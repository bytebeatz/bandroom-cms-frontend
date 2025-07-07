// src/app/api/skills/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/skills/${params.id}`,
    { headers },
  );

  const data = await res.json();
  return new NextResponse(JSON.stringify(data), { status: res.status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/skills/${params.id}`,
    {
      method: "PUT",
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/skills/${params.id}`,
    {
      method: "DELETE",
      headers,
    },
  );

  return new NextResponse(null, { status: res.status });
}
