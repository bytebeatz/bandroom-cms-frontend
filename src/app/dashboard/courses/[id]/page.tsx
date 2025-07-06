import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthHeaders } from "@/lib/auth";

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  language: string;
  difficulty: number;
  is_published: boolean;
  tags: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
};

async function fetchCourse(id: string): Promise<Course | null> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_BACKEND_API}/api/courses/${id}`,
    { headers },
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await fetchCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="px-6 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <Link
          href={`/dashboard/courses/${course.id}/edit`}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Course
        </Link>
      </div>

      <p className="text-zinc-600 mb-2">{course.description}</p>

      <div className="space-y-1 text-sm text-zinc-500">
        <p>
          <strong>Slug:</strong> {course.slug}
        </p>
        <p>
          <strong>Language:</strong> {course.language}
        </p>
        <p>
          <strong>Difficulty:</strong>{" "}
          {["", "Beginner", "Intermediate", "Advanced"][course.difficulty]}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {course.is_published ? (
            <span className="text-green-600">Published</span>
          ) : (
            <span className="text-orange-600">Unpublished</span>
          )}
        </p>
        {course.tags?.length > 0 && (
          <p>
            <strong>Tags:</strong> {course.tags.join(", ")}
          </p>
        )}
        {course.metadata && (
          <p>
            <strong>Metadata:</strong>{" "}
            <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs">
              {JSON.stringify(course.metadata)}
            </code>
          </p>
        )}
        <p className="text-xs mt-4">
          Created: {new Date(course.created_at).toLocaleString()}
        </p>
        <p className="text-xs">
          Updated: {new Date(course.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
