// lib/api.ts
import { getAuthHeaders } from "@/lib/auth";
import { Course, Unit } from "@/types";

export async function fetchCourses(): Promise<Course[]> {
  const headers = await getAuthHeaders();

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

export async function fetchCourseById(id: string): Promise<Course | null> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/courses/${id}`,
    { headers },
  );

  if (!res.ok) return null;

  return res.json();
}

export async function fetchUnitsByCourseId(courseId: string): Promise<Unit[]> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/units/course/${courseId}`,
    { headers },
  );

  if (!res.ok) return [];

  return res.json();
}
