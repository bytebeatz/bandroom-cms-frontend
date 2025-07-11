// app/dashboard/courses/[courseId]/units/[unitId]/skills/[skillId]/lessons/[lessonId]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchCourseById,
  fetchUnitById,
  fetchSkillById,
  fetchLessonById,
} from "@/lib/api";
import { Lesson } from "@/types/lesson";
import { Skill } from "@/types/skill";
import { Unit } from "@/types/unit";
import { Course } from "@/types";

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{
    courseId: string;
    unitId: string;
    skillId: string;
    lessonId: string;
  }>;
}) {
  const { courseId, unitId, skillId, lessonId } = await params;

  const course: Course | null = await fetchCourseById(courseId);
  const unit: Unit | null = await fetchUnitById(unitId);
  const skill: Skill | null = await fetchSkillById(skillId);
  const lesson: Lesson | null = await fetchLessonById(lessonId);

  if (!course || !unit || !skill || !lesson) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-800">{lesson.title}</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Course: {course.title} → Unit: {unit.title} → Skill: {skill.title}
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <Link
          href={`/dashboard/courses/${courseId}/units/${unitId}/skills/${skillId}`}
          className="text-sm px-4 py-2 bg-zinc-200 text-zinc-700 rounded hover:bg-zinc-300"
        >
          Back to Skill
        </Link>
        <Link
          href={`/dashboard/courses/${courseId}/units/${unitId}/skills/${skillId}/lessons/${lesson.id}/edit`}
          className="text-sm px-4 py-2 bg-zinc-500 text-white rounded hover:bg-zinc-600"
        >
          Edit Lesson
        </Link>
      </div>

      <div className="space-y-4 text-zinc-700">
        <p>
          <strong>Slug:</strong> {lesson.slug}
        </p>
        <p>
          <strong>Order Index:</strong> {lesson.order_index}
        </p>
        <p>
          <strong>Total Exercises:</strong> {lesson.total_exercises}
        </p>
        <p>
          <strong>Base XP:</strong> {lesson.base_xp}
        </p>
        <p>
          <strong>Bonus XP:</strong> {lesson.bonus_xp}
        </p>
        <p>
          <strong>Gems:</strong> {lesson.reward_gems}
        </p>
        <p>
          <strong>Hearts:</strong> {lesson.reward_hearts}
        </p>
        <p>
          <strong>Reward Condition:</strong> {lesson.reward_condition}
        </p>
        <p>
          <strong>Estimated Duration:</strong> {lesson.estimated_duration} min
        </p>
        <p>
          <strong>Difficulty Rating:</strong> {lesson.difficulty_rating}
        </p>
        <p>
          <strong>Testable:</strong> {lesson.is_testable ? "Yes" : "No"}
        </p>
        <p>
          <strong>Tags:</strong>{" "}
          {lesson.tags?.length ? lesson.tags.join(", ") : "None"}
        </p>
        <p>
          <strong>Version:</strong> {lesson.version}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(lesson.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong>{" "}
          {new Date(lesson.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
