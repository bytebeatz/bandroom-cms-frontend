// src/app/dashboard/courses/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";
import CreateCourseForm from "@/components/forms/CreateCourseForm";

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

export default async function EditCoursePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  const res = await fetch(`${process.env.CMS_API_URL}/api/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const course: Course = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      {/* ⚠️ You can reuse your existing CreateCourseForm with default values passed in */}
      <CreateCourseForm
        courseId={course.id}
        defaultValues={{
          title: course.title,
          slug: course.slug,
          description: course.description,
          language: course.language,
          difficulty: String(course.difficulty),
          tags: course.tags.join(", "),
          icon: course.metadata?.icon || "",
          estimatedMinutes: String(course.metadata?.estimated_minutes ?? ""),
          isPublished: course.is_published,
        }}
      />
    </div>
  );
}
