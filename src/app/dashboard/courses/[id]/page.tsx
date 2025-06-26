import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";
import DeleteCourseButton from "@/components/ui/DeleteCourseButton";

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

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
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard/courses"
          className="inline-flex items-center text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          ← Back to Courses
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            href={`/dashboard/units/new?courseId=${id}`}
            className="inline-flex items-center text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ➕ Add Unit
          </Link>

          <Link
            href={`/dashboard/courses/${id}/edit`}
            className="inline-flex items-center text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            ✎ Edit Course
          </Link>

          <DeleteCourseButton courseId={id} />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
        {course.title}
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {course.description}
      </p>

      <div className="grid gap-2 text-base text-gray-600 dark:text-gray-300">
        <div>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Slug:
          </span>{" "}
          {course.slug}
        </div>
        <div>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Language:
          </span>{" "}
          {course.language}
        </div>
        <div>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Difficulty:
          </span>{" "}
          {course.difficulty}
        </div>
        <div>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Tags:
          </span>{" "}
          {course.tags.join(", ")}
        </div>
        <div>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Published:
          </span>{" "}
          {course.is_published ? "Yes" : "No"}
        </div>
        <div>
          <span className="font-medium text-gray-800 dark:text-gray-100">
            Estimated time:
          </span>{" "}
          {course.metadata.estimated_minutes ?? "?"} min
        </div>
      </div>
    </div>
  );
}
