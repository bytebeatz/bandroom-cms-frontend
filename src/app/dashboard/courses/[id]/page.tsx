//export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";

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

export default async function CourseDetailPage(props: {
  params: Promise<{ id: string }>; // ✅ Next.js 15 requires params to be awaited
}) {
  const { id } = await props.params; // ✅ Critical: await the Promise

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  const res = await fetch(`${process.env.CMS_API_URL}/api/courses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const course: Course = await res.json();

  return (
    <div>
      <Link
        href="/dashboard/courses"
        className="inline-flex items-center text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition mb-6"
      >
        ← Back to Courses
      </Link>

      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <div>Slug: {course.slug}</div>
        <div>Language: {course.language}</div>
        <div>Difficulty: {course.difficulty}</div>
        <div>Tags: {course.tags.join(", ")}</div>
        <div>Published: {course.is_published ? "Yes" : "No"}</div>
        <div>
          Estimated time: {course.metadata.estimated_minutes ?? "?"} min
        </div>
      </div>
    </div>
  );
}
