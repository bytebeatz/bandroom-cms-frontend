// src/app/api/skills/[id]/route.ts

import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const token = cookies().get("access_token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/skills/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    return new Response(text, { status: res.status });
  } catch (err) {
    console.error("Failed to fetch skill:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const token = cookies().get("access_token")?.value;

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
    const res = await fetch(`${process.env.CMS_API_URL}/api/skills/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    return new Response(text, { status: res.status });
  } catch (err) {
    console.error("Failed to update skill:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const token = cookies().get("access_token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.CMS_API_URL}/api/skills/${id}`, {
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
  } catch (err) {
    console.error("Failed to delete skill:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
