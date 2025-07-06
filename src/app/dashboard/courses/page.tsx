import Link from "next/link";
import { fetchCourses } from "@/lib/api";

export default async function CoursesPage() {
  const { courses } = await fetchCourses();

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Courses</h1>
        <Link
          href="/dashboard/courses/new"
          className="px-4 py-2 rounded-md bg-zinc-900 text-white text-sm hover:bg-zinc-800 transition"
        >
          + Add Course
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {courses.map((course) => (
          <div key={course.id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
            <Link
              href={`/dashboard/courses/${course.id}`}
              className="block bg-zinc-50 border rounded-md p-4 hover:bg-zinc-100 transition cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-zinc-800">
                  {course.title}
                </h2>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-sm ${
                    course.is_published
                      ? "bg-green-100 text-green-900"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {course.is_published ? "Published" : "Unpublished"}
                </span>
              </div>

              <p className="text-sm text-zinc-500">{course.description}</p>

              <p className="text-xs text-zinc-400">
                Difficulty: {course.difficulty}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
