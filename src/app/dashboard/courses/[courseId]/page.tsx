// app/dashboard/courses/[courseId]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchCourseById, fetchUnitsByCourseId, Course, Unit } from "@/lib/api";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const course: Course | null = await fetchCourseById(courseId);
  const units = await fetchUnitsByCourseId(courseId);

  if (!course) {
    notFound();
  }
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-lg font-semibold mb-4">Course</h2>

        <div className="flex gap-2">
          <Link
            href={`/dashboard/courses/${course.id}/edit`}
            className="text-sm px-4 py-2 bg-zinc-200 text-zinc-600 rounded hover:bg-zinc-300 hover:text-zinc-600"
          >
            Edit Course
          </Link>
          <Link
            href={`/dashboard/courses/${course.id}/units/new`}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Unit
          </Link>
        </div>
      </div>

      <p className="text-sm text-zinc-500 mb-4">
        Title: <strong>{course.title}</strong>
      </p>

      <p className="text-sm text-zinc-500 mb-4">
        Description: <strong>{course.description}</strong>
      </p>

      <div className="space-y-5 text-sm text-zinc-500">
        <p>
          Slug: <strong>{course.slug}</strong>
        </p>
        <p>
          Language: <strong>{course.language}</strong>
        </p>
        <p>
          Difficulty:{" "}
          <strong>
            {["", "Beginner", "Intermediate", "Advanced"][course.difficulty]}
          </strong>
        </p>
        <p>
          Status:
          <strong>
            {course.is_published ? (
              <span className="text-green-600"> Published</span>
            ) : (
              <span className="text-orange-600"> Unpublished</span>
            )}
          </strong>
        </p>
        {course.tags?.length > 0 && (
          <p>
            Tags: <strong>{course.tags.join(", ")}</strong>
          </p>
        )}
        {course.metadata && (
          <p>
            Metadata:
            <strong>
              {" "}
              <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs">
                {JSON.stringify(course.metadata)}
              </code>
            </strong>
          </p>
        )}
        <p>
          Created:{" "}
          <strong>{new Date(course.created_at).toLocaleString()}</strong>
        </p>
        <p>
          Updated:{" "}
          <strong>{new Date(course.updated_at).toLocaleString()}</strong>
        </p>
      </div>

      {/* Divider */}
      <hr className="my-8" />

      {/* Units Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Units</h2>

        {units.length === 0 ? (
          <p className="text-sm text-zinc-500">No units created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="p-4 border rounded-md bg-white shadow-sm hover:shadow transition"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <p className="font-semibold">
                      {unit.order_index}. {unit.title}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {unit.description || "No description"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/dashboard/courses/${course.id}/units/${unit.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
