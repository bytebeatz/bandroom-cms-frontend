import { NextRequest, NextResponse } from "next/server";
import { getAuthHeaders } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const lessonId = params.id;

  console.log("Received PUT for lessonId:", lessonId);

  if (!lessonId) {
    return NextResponse.json({ error: "Invalid lesson ID" }, { status: 400 });
  }

  const body = await req.json();
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/lessons/${lessonId}`,
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
  const { lessonId } = params;
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/lessons/${lessonId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  return new NextResponse(null, { status: res.status });
}
