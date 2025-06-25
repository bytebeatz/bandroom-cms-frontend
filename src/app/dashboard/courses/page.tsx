// src/app/dashboard/courses/page.tsx

import Link from "next/link";
import { getAccessTokenFromCookies, requireAdmin } from "@/lib/auth";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  language: string;
  difficulty: number;
  is_published: boolean;
  tags: string[];
  metadata: {
    icon?: string;
    estimated_minutes?: number;
  };
}

export default async function CoursesPage() {
  await requireAdmin(); // ✅ enforce access first

  const token = await getAccessTokenFromCookies();
  if (!token) throw new Error("No token found");

  const res = await fetch(`${process.env.CMS_API_URL}/api/courses`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  const courses: Course[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.courses)
      ? data.courses
      : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link
          href="/dashboard/courses/new"
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-90"
        >
          + Create Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No courses available yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id}>
              <Link href={`/dashboard/courses/${course.id}`}>
                <div className="border p-4 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{course.title}</h2>
                      <p className="text-sm text-gray-500">
                        {course.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Language: {course.language} · Difficulty:{" "}
                        {course.difficulty} · {course.tags.join(", ")}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        course.is_published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.is_published ? "Published" : "Not published"}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
