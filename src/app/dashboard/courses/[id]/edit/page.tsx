import Link from "next/link";
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
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Course</h1>
      </div>

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
