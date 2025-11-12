import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchSkillById,
  fetchUnitById,
  fetchLessonsBySkillId,
} from "@/lib/api";
import { Skill } from "@/types/skill";
import { Unit } from "@/types/unit";
import { Lesson } from "@/types/lesson";

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; unitId: string; skillId: string }>;
}) {
  const { courseId, unitId, skillId } = await params;

  const skill: Skill | null = await fetchSkillById(skillId);
  const unit: Unit | null = await fetchUnitById(unitId);
  const lessons: Lesson[] = await fetchLessonsBySkillId(skillId);

  console.log("Fetched lessons:", lessons); // ✅ Debug log
  console.log("👉 Lessons fetched from backend:", lessons);

  if (!skill || !unit) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="font-bold">SKILLS</h1>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-zinc-700 flex items-center gap-2">
            <span>{skill.icon}</span>
            {skill.title}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Unit: {unit.title}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/courses/${courseId}/units/${unitId}`}
            className="text-sm px-4 py-2 bg-zinc-200 text-zinc-600 rounded hover:bg-zinc-300"
          >
            Back to Unit
          </Link>
          <Link
            href={`/dashboard/courses/${courseId}/units/${unitId}/skills/${skill.id}/edit`}
            className="text-sm px-4 py-2 bg-zinc-500 text-white rounded hover:bg-zinc-600"
          >
            Edit Skill
          </Link>
          <Link
            href={`/dashboard/courses/${courseId}/units/${unitId}/skills/${skill.id}/lessons/new`}
            className="text-sm px-4 py-2 bg-zinc-500 text-white rounded hover:bg-zinc-600"
          >
            + Create Lesson
          </Link>
        </div>
      </div>

      <div className="text-zinc-600 space-y-4">
        <p>
          <strong>Difficulty:</strong> {skill.difficulty}
        </p>
        <p>
          <strong>Max Crowns:</strong> {skill.max_crowns}
        </p>
        <p>
          <strong>Base XP:</strong> {skill.base_xp_reward}
        </p>
        <p>
          <strong>XP per Crown:</strong> {skill.xp_per_crown}
        </p>
        <p>
          <strong>Tags:</strong> {skill.tags?.join(", ") || "None"}
        </p>
        <p>
          <strong>Version:</strong> {skill.version}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(skill.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong>{" "}
          {new Date(skill.updated_at).toLocaleString()}
        </p>
      </div>

      <hr className="my-8" />

      {/* ✅ Render Lessons if Available */}
      {lessons.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-700 mb-2">Lessons</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="border p-4 rounded bg-white shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-zinc-800">{lesson.title}</h3>
                  <p className="text-sm text-zinc-500">
                    Exercises: {lesson.total_exercises}
                  </p>
                </div>
                <Link
                  href={`/dashboard/courses/${courseId}/units/${unitId}/skills/${skillId}/lessons/${lesson.id}`}
                  className="text-zinc-600 hover:underline"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
