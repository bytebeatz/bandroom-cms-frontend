"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SkillForm({
  courseId,
  unitId,
}: {
  courseId: string;
  unitId: string;
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("🎯");
  const [orderIndex, setOrderIndex] = useState(1);
  const [difficulty, setDifficulty] = useState(2);
  const [maxCrowns, setMaxCrowns] = useState(3);
  const [baseXpReward, setBaseXpReward] = useState(10);
  const [xpPerCrown, setXpPerCrown] = useState(5);
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [metadata, setMetadata] = useState({});
  const [version, setVersion] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: courseId,
        unit_id: unitId,
        title,
        slug,
        icon,
        order_index: orderIndex,
        difficulty,
        max_crowns: maxCrowns,
        base_xp_reward: baseXpReward,
        xp_per_crown: xpPerCrown,
        prerequisite_skill_ids: prerequisites,
        tags,
        metadata,
        version,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Failed to create skill", res.status, err);
      return;
    }

    const created = await res.json();
    router.push(`/dashboard/skills/${created.id}`);
  };

  const handleCancel = () => {
    router.push("/dashboard/courses");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <input
          name="title"
          placeholder="e.g. Time Signatures"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Slug</label>
        <input
          name="slug"
          placeholder="e.g. time-signatures"
          className="w-full border p-2 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Icon</label>
        <input
          name="icon"
          placeholder="e.g. 🎯"
          className="w-full border p-2 rounded"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Order Index</label>
        <input
          name="orderIndex"
          type="number"
          className="w-full border p-2 rounded"
          value={orderIndex}
          onChange={(e) => setOrderIndex(e.target.valueAsNumber)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Difficulty (1–5)
        </label>
        <input
          name="difficulty"
          type="number"
          className="w-full border p-2 rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.valueAsNumber)}
          min={1}
          max={5}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Max Crowns</label>
        <input
          name="maxCrowns"
          type="number"
          className="w-full border p-2 rounded"
          value={maxCrowns}
          onChange={(e) => setMaxCrowns(e.target.valueAsNumber)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Base XP Reward</label>
        <input
          name="baseXpReward"
          type="number"
          className="w-full border p-2 rounded"
          value={baseXpReward}
          onChange={(e) => setBaseXpReward(e.target.valueAsNumber)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">XP Per Crown</label>
        <input
          name="xpPerCrown"
          type="number"
          className="w-full border p-2 rounded"
          value={xpPerCrown}
          onChange={(e) => setXpPerCrown(e.target.valueAsNumber)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Prerequisite Skill IDs (comma-separated UUIDs)
        </label>
        <input
          name="prerequisites"
          className="w-full border p-2 rounded"
          placeholder="uuid-1,uuid-2"
          value={prerequisites.join(",")}
          onChange={(e) =>
            setPrerequisites(
              e.target.value
                .split(",")
                .map((id) => id.trim())
                .filter(Boolean),
            )
          }
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Tags (comma-separated)
        </label>
        <input
          name="tags"
          className="w-full border p-2 rounded"
          placeholder="reading, fundamentals"
          value={tags.join(",")}
          onChange={(e) =>
            setTags(
              e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            )
          }
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Version</label>
        <input
          name="version"
          type="number"
          className="w-full border p-2 rounded"
          value={version}
          onChange={(e) => setVersion(e.target.valueAsNumber)}
        />
      </div>

      <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={handleCancel}
          className="w-1/2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/2 bg-black dark:bg-white text-white dark:text-black p-2 rounded hover:opacity-90"
        >
          Create Skill
        </button>
      </div>
    </form>
  );
}
