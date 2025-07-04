import { getAuthHeaders } from "@/lib/auth";

export async function fetchCourses() {
  const headers = await getAuthHeaders(); // ✅ now async

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/courses`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}
