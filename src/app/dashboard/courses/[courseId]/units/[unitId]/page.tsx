// app/dashboard/courses/[courseId]/units/[unitId]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchUnitById, fetchSkillsByUnitId } from "@/lib/api";
import { Unit } from "@/types/unit";
import { Skill } from "@/types/skill";

export default async function UnitDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; unitId: string }>;
}) {
  const { courseId, unitId } = await params; // ✅ async access

  const unit: Unit | null = await fetchUnitById(unitId);
  const skills: Skill[] = await fetchSkillsByUnitId(unitId);

  if (!unit) {
    notFound();
  }

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="font-semibold">UNITS</h1>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-zinc-700">
          {unit.order_index}. {unit.title}
        </h1>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/courses/${courseId}`}
            className="text-sm px-4 py-2 bg-zinc-200 text-zinc-600 rounded hover:bg-zinc-300 hover:text-zinc-600"
          >
            Back to Course
          </Link>
          <Link
            href={`/dashboard/courses/${courseId}/units/${unitId}/edit`}
            className="text-sm px-4 py-2 bg-zinc-400 text-zinc-100 rounded hover:bg-zinc-600 hover:text-zinc-300"
          >
            Edit Unit
          </Link>
          <Link
            href={`/dashboard/courses/${courseId}/units/${unitId}/skills/new`}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Skill
          </Link>
        </div>
      </div>

      <p className="text-zinc-600 mb-4">
        {unit.description || "No description"}
      </p>

      <div className="text-sm text-zinc-500 space-y-2 mb-6">
        <p>
          <strong>Version:</strong> {unit.version}
        </p>
        <p>
          <strong>Created:</strong> {new Date(unit.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong> {new Date(unit.updated_at).toLocaleString()}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Skills</h2>
        {skills.length === 0 ? (
          <p className="text-sm text-zinc-500">No skills created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, idx) => (
              <div
                key={skill.id}
                className="border px-4 py-3 rounded shadow-sm bg-white flex flex-col justify-between"
              >
                <div>
                  <p className="font-medium mb-1">
                    {idx + 1}. {skill.title}
                  </p>
                  <p className="text-sm text-zinc-500">
                    Difficulty: {skill.difficulty || "No description"}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <Link
                    href={`/dashboard/courses/${courseId}/units/${unitId}/skills/${skill.id}/edit`}
                    className="text-sm text-zinc-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/dashboard/courses/${courseId}/units/${unitId}/skills/${skill.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
