import Link from "next/link";
import { notFound } from "next/navigation";
import { getAccessTokenFromCookies, requireAdmin } from "@/lib/auth";

interface Unit {
  id: string;
  title: string;
  order_index: number;
  course_id: string;
}

interface Skill {
  id: string;
  title: string;
  icon: string;
  order_index: number;
  difficulty: number;
}

export default async function UnitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const unitId = params.id;

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  // Fetch unit
  const unitRes = await fetch(
    `${process.env.CMS_API_URL}/api/units/${unitId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!unitRes.ok) return notFound();
  const unit: Unit = await unitRes.json();

  // Fetch skills in this unit
  let skills: Skill[] = [];

  try {
    const skillRes = await fetch(
      `${process.env.CMS_API_URL}/api/skills?unit_id=${unit.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );

    if (skillRes.ok) {
      const text = await skillRes.text();
      if (text) {
        try {
          const data = JSON.parse(text);

          // Defensive defaulting
          if (Array.isArray(data)) {
            skills = data;
          } else if (data && Array.isArray(data.skills)) {
            skills = data.skills;
          } else {
            console.warn(
              "[ Server ] Unexpected skills response format. Defaulting to empty array. Got:",
              data,
            );
            skills = [];
          }
        } catch (err) {
          console.error("[ Server ] Failed to parse skills JSON:", err);
          skills = [];
        }
      } else {
        console.warn("[ Server ] Empty response body from skills API.");
        skills = [];
      }
    } else {
      console.error("[ Server ] Skill API failed with status", skillRes.status);
      skills = [];
    }
  } catch (err) {
    console.error("[ Server ] Skill fetch failed:", err);
    skills = [];
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/dashboard/courses/${unit.course_id}`}
          className="inline-flex items-center text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          ← Back to Course Detail
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{unit.title}</h1>
        <Link
          href={`/dashboard/skills/new?courseId=${unit.course_id}&unitId=${unit.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Skill
        </Link>
      </div>

      {skills.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No skills in this unit yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="border p-4 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <div className="flex justify-between items-center">
                <Link
                  href={`/dashboard/skills/${skill.id}`}
                  className="block flex-1"
                >
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <span>{skill.icon}</span>
                    {skill.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Difficulty: {skill.difficulty} · Order: {skill.order_index}
                  </p>
                </Link>
                <Link
                  href={`/dashboard/skills/${skill.id}/edit`}
                  className="text-blue-500 hover:underline text-sm ml-4 whitespace-nowrap"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
