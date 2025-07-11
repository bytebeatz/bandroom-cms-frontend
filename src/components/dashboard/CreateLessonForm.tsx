"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLessonForm({
  courseId,
  unitId,
  skillId,
}: {
  courseId: string;
  unitId: string;
  skillId: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [baseXP, setBaseXP] = useState(10);
  const [bonusXP, setBonusXP] = useState(0);
  const [rewardGems, setRewardGems] = useState(0);
  const [rewardHearts, setRewardHearts] = useState(0);
  const [rewardCondition, setRewardCondition] = useState("complete");
  const [totalExercises, setTotalExercises] = useState(0);
  const [estimatedDuration, setEstimatedDuration] = useState(5);
  const [difficultyRating, setDifficultyRating] = useState(1);
  const [isTestable, setIsTestable] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/lessons", {
      method: "POST",
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
        tags: [],
        metadata: {},
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
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Order Index</label>
          <input
            type="number"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={orderIndex}
            onChange={(e) => setOrderIndex(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Base XP</label>
          <input
            type="number"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={baseXP}
            onChange={(e) => setBaseXP(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bonus XP</label>
          <input
            type="number"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={bonusXP}
            onChange={(e) => setBonusXP(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reward Gems</label>
          <input
            type="number"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={rewardGems}
            onChange={(e) => setRewardGems(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reward Hearts</label>
          <input
            type="number"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={rewardHearts}
            onChange={(e) => setRewardHearts(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Total Exercises</label>
          <input
            type="number"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={totalExercises}
            onChange={(e) => setTotalExercises(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Estimated Duration (min)
          </label>
          <input
            type="number"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={estimatedDuration}
            onChange={(e) => setEstimatedDuration(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Difficulty Rating</label>
          <input
            type="number"
            step="0.1"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={difficultyRating}
            onChange={(e) => setDifficultyRating(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Reward Condition</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={rewardCondition}
            onChange={(e) => setRewardCondition(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="mt-1 block w-full border rounded-md px-3 py-2"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        Create Lesson
      </button>
    </form>
  );
}
