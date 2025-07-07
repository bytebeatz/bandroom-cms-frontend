"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CreateSkillForm() {
  const router = useRouter();
  const { courseId, unitId } = useParams();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("🎯");
  const [orderIndex, setOrderIndex] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [maxCrowns, setMaxCrowns] = useState(3);
  const [baseXPReward, setBaseXPReward] = useState(10);
  const [xpPerCrown, setXPPerCrown] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<Record<string, any>>({});

  const [prerequisiteSkillIds, setPrerequisiteSkillIds] = useState<string[]>(
    [],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const payload = {
      course_id: courseId,
      unit_id: unitId,
      title,
      icon,
      order_index: orderIndex,
      difficulty,
      max_crowns: maxCrowns,
      base_xp_reward: baseXPReward,
      xp_per_crown: xpPerCrown,
      prerequisite_skill_ids: prerequisiteSkillIds,
      tags,
      metadata,
    };

    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create skill");
      }

      const createdSkill = await res.json();
      router.push(`/dashboard/courses/${courseId}/units/${unitId}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 px-6 py-8"
    >
      <h1 className="text-2xl font-bold">Create New Skill</h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Icon</label>
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Order</label>
          <input
            type="number"
            value={orderIndex}
            onChange={(e) => setOrderIndex(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Difficulty (1–3)
          </label>
          <input
            type="number"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={1}
            max={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Max Crowns</label>
          <input
            type="number"
            value={maxCrowns}
            onChange={(e) => setMaxCrowns(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Base XP Reward
          </label>
          <input
            type="number"
            value={baseXPReward}
            onChange={(e) => setBaseXPReward(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">XP Per Crown</label>
        <input
          type="number"
          value={xpPerCrown}
          onChange={(e) => setXPPerCrown(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Prerequisite Skill IDs (comma-separated)
        </label>
        <input
          type="text"
          value={prerequisiteSkillIds.join(", ")}
          onChange={(e) =>
            setPrerequisiteSkillIds(
              e.target.value
                .split(",")
                .map((id) => id.trim())
                .filter(Boolean),
            )
          }
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() =>
            router.push(`/dashboard/courses/${courseId}/units/${unitId}`)
          }
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Skill"}
        </button>
      </div>
    </form>
  );
}
