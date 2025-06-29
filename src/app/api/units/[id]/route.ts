// src/app/api/units/[id]/route.ts

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/units/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      return new Response(null, { status: 204 });
    }

    const text = await res.text();
    return new Response(text, { status: res.status });
  } catch (err: any) {
    console.error("Failed to delete unit from CMS:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("Invalid JSON:", err);
    return new Response("Invalid JSON", { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/units/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return new Response(text, { status: res.status });
  } catch (err: any) {
    console.error("Failed to update unit:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
