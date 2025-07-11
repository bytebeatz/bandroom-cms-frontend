"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lesson } from "@/types/lesson";

export default function EditLessonForm({
  courseId,
  unitId,
  skillId,
  lesson,
}: {
  courseId: string;
  unitId: string;
  skillId: string;
  lesson: Lesson;
}) {
  const router = useRouter();

  // ✅ log lesson ID at top
  useEffect(() => {
    console.log("EditLessonForm loaded with lesson ID:", lesson?.id);
  }, [lesson]);

  const [title, setTitle] = useState(lesson.title || "");
  const [slug, setSlug] = useState(lesson.slug || "");
  const [orderIndex, setOrderIndex] = useState(lesson.order_index || 0);
  const [baseXP, setBaseXP] = useState(lesson.base_xp || 10);
  const [bonusXP, setBonusXP] = useState(lesson.bonus_xp || 0);
  const [rewardGems, setRewardGems] = useState(lesson.reward_gems || 0);
  const [rewardHearts, setRewardHearts] = useState(lesson.reward_hearts || 0);
  const [rewardCondition, setRewardCondition] = useState(
    lesson.reward_condition || "complete",
  );
  const [totalExercises, setTotalExercises] = useState(
    lesson.total_exercises || 0,
  );
  const [estimatedDuration, setEstimatedDuration] = useState(
    lesson.estimated_duration || 5,
  );
  const [difficultyRating, setDifficultyRating] = useState(
    lesson.difficulty_rating || 1,
  );
  const [isTestable, setIsTestable] = useState(lesson.is_testable || false);
  const [description, setDescription] = useState(lesson.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lesson?.id) {
      alert("Missing lesson ID. Cannot submit.");
      return;
    }

    const res = await fetch(`/api/lessons/${lesson.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skill_id: skillId,
        title,
        slug,
        description,
        order_index: orderIndex,
        base_xp: baseXP,
        bonus_xp: bonusXP,
        reward_gems: rewardGems,
        reward_hearts: rewardHearts,
        reward_condition: rewardCondition,
        total_exercises: totalExercises,
        estimated_duration: estimatedDuration,
        difficulty_rating: difficultyRating,
        is_testable: isTestable,
        tags: lesson.tags || [],
        metadata: lesson.metadata || {},
      }),
    });

    if (res.ok) {
      router.push(
        `/dashboard/courses/${courseId}/units/${unitId}/skills/${skillId}`,
      );
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Order Index</label>
          <input
            type="number"
            value={orderIndex}
            onChange={(e) => setOrderIndex(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Base XP</label>
          <input
            type="number"
            value={baseXP}
            onChange={(e) => setBaseXP(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bonus XP</label>
          <input
            type="number"
            value={bonusXP}
            onChange={(e) => setBonusXP(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reward Gems</label>
          <input
            type="number"
            value={rewardGems}
            onChange={(e) => setRewardGems(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reward Hearts</label>
          <input
            type="number"
            value={rewardHearts}
            onChange={(e) => setRewardHearts(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Total Exercises</label>
          <input
            type="number"
            value={totalExercises}
            onChange={(e) => setTotalExercises(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Estimated Duration (min)
          </label>
          <input
            type="number"
            value={estimatedDuration}
            onChange={(e) => setEstimatedDuration(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Difficulty Rating</label>
          <input
            type="number"
            step="0.1"
            value={difficultyRating}
            onChange={(e) => setDifficultyRating(Number(e.target.value))}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reward Condition</label>
          <input
            type="text"
            value={rewardCondition}
            onChange={(e) => setRewardCondition(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border rounded-md px-3 py-2"
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isTestable}
          onChange={(e) => setIsTestable(e.target.checked)}
        />
        <label className="text-sm">Is Testable?</label>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition"
      >
        Update Lesson
      </button>
    </form>
  );
}
