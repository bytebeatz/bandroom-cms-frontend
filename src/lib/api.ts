// lib/api.ts
import { getAuthHeaders } from "@/lib/auth";
import { Lesson, Course, Unit } from "@/types";

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

  const data = await res.json();

  // Always return a safe array
  return Array.isArray(data) ? data : [];
}

export async function fetchUnitById(unitId: string): Promise<Unit | null> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/units/${unitId}`,
    { headers },
  );

  if (!res.ok) return null;

  return res.json();
}

export async function fetchSkillsByUnitId(unitId: string): Promise<Skill[]> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/skills?unit_id=${unitId}`,
    { headers },
  );

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchSkillById(skillId: string): Promise<Skill | null> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/skills/${skillId}`,
    { headers },
  );

  if (!res.ok) return null;

  return res.json();
}

export async function fetchLessonsBySkillId(
  skillId: string,
): Promise<Lesson[]> {
  const headers = await getAuthHeaders(); // ✅ important!

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/lessons?skill_id=${skillId}`,
    {
      headers,
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch lessons");
  }

  const data = await res.json();
  return Array.isArray(data.lessons) ? data.lessons : []; // If your API returns { lessons: [...] }
}

export async function fetchLessonById(
  lessonId: string,
): Promise<Lesson | null> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/lessons/${lessonId}`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  return res.json();
}
