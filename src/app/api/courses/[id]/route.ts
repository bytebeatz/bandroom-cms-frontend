import { NextRequest } from "next/server";
import { cookies } from "next/headers";

// PUT: Update a course
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
    console.error("Invalid JSON in request:", err);
    return new Response("Invalid JSON", { status: 400 });
  }

  try {
    const backendRes = await fetch(
      `${process.env.CMS_API_URL}/api/courses/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    const responseText = await backendRes.text();

    if (!backendRes.ok) {
      console.error("Backend error:", backendRes.status, responseText);
      return new Response(responseText, { status: backendRes.status });
    }

    return new Response(responseText, { status: 200 });
  } catch (error) {
    console.error("Network error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// DELETE: Delete a course
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
    const backendRes = await fetch(
      `${process.env.CMS_API_URL}/api/courses/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const responseText = await backendRes.text();

    if (!backendRes.ok) {
      console.error("Backend error:", backendRes.status, responseText);
      return new Response(responseText, { status: backendRes.status });
    }

    return new Response(responseText, { status: 200 });
  } catch (error) {
    console.error("Network error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
