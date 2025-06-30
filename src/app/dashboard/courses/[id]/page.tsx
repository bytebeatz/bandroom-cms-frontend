import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";
import DeleteCourseButton from "@/components/ui/DeleteCourseButton";
import DeleteUnitButton from "@/components/ui/DeleteUnitButton";

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

interface Skill {
  id: string;
  title: string;
  icon: string;
  order_index: number;
  difficulty: number;
}

interface Unit {
  id: string;
  title: string;
  order_index: number;
  skills?: Skill[];
}

export default async function CourseDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  const [courseRes, unitsRes] = await Promise.all([
    fetch(`${process.env.CMS_API_URL}/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${process.env.CMS_API_URL}/api/units/course/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);

  if (!courseRes.ok) return notFound();
  const course: Course = await courseRes.json();

  let units: Unit[] = [];

  if (unitsRes.ok) {
    try {
      const unitData: Unit[] = await unitsRes.json();

      const skillPromises = unitData.map((unit) =>
        fetch(`${process.env.CMS_API_URL}/api/skills?unit_id=${unit.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }).then(async (res) => {
          if (!res.ok) return [];
          const raw = await res.text();
          try {
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : (parsed.skills ?? []);
          } catch {
            return [];
          }
        }),
      );

      const skillGroups = await Promise.all(skillPromises);

      units = unitData.map((unit, idx) => ({
        ...unit,
        skills: skillGroups[idx],
      }));
    } catch {
      units = [];
    }
  }

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

      <h1 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
        Course details
      </h1>

      <div className="grid gap-2 text-base text-gray-600 dark:text-gray-300 mb-8">
        <div>
          Course:<strong> {course.title}</strong>
        </div>
        <div>
          Description:<strong> {course.description}</strong>
        </div>
        <div>
          Slug:<strong> {course.slug}</strong>
        </div>
        <div>
          Language:<strong> {course.language}</strong>
        </div>
        <div>
          Difficulty:<strong> {course.difficulty}</strong>
        </div>
        <div>
          Tags:<strong> {course.tags.join(", ")}</strong>
        </div>
        <div>
          Published:<strong> {course.is_published ? "Yes" : "No"} </strong>
        </div>
        <div>
          Estimated time:{" "}
          <strong>{course.metadata.estimated_minutes ?? "?"} min</strong>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        Units
      </h2>

      {units.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No units yet. Click “Add Unit” to begin building your course.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {units.map((unit) => (
            <li key={unit.id} className="w-full sm:w-1/2 lg:w-1/4">
              <div className="relative p-4 rounded border hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                {/* Edit/Delete buttons */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <Link
                    href={`/dashboard/units/${unit.id}/edit`}
                    className="text-lg text-gray-600 hover:text-gray-900"
                  >
                    ✎
                  </Link>
                  <DeleteUnitButton unitId={unit.id} courseId={id} />
                </div>

                {/* Unit title */}
                <Link href={`/dashboard/units/${unit.id}`}>
                  <div className="font-medium text-lg text-gray-800 dark:text-white">
                    {unit.order_index}. {unit.title}
                  </div>
                </Link>

                {/* Skills inside the unit */}
                <div className="mt-3 space-y-1">
                  {unit.skills && unit.skills.length > 0 ? (
                    unit.skills.map((skill) => (
                      <Link
                        key={skill.id}
                        href={`/dashboard/skills/${skill.id}`}
                        className="block text-sm text-gray-600 hover:text-blue-600"
                      >
                        {skill.icon} {skill.title} (Lvl {skill.difficulty})
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No skills</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
