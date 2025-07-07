// components/dashboard/EditSkillForm.tsx
"use client";

import { Skill } from "@/types/skill";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  skill: Skill;
};

export default function EditSkillForm({ skill }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(skill.title);
  const [slug, setSlug] = useState(skill.slug);
  const [icon, setIcon] = useState(skill.icon);
  const [orderIndex, setOrderIndex] = useState(skill.order_index || 0);
  const [difficulty, setDifficulty] = useState(skill.difficulty || 1);
  const [maxCrowns, setMaxCrowns] = useState(skill.max_crowns || 3);
  const [baseXpReward, setBaseXpReward] = useState(skill.base_xp_reward || 10);
  const [xpPerCrown, setXpPerCrown] = useState(skill.xp_per_crown || 5);
  const [version, setVersion] = useState(skill.version || 1);
  const [tags, setTags] = useState(skill.tags || []);
  const [metadata, setMetadata] = useState(skill.metadata || {});
  const [prerequisiteSkillIds, setPrerequisiteSkillIds] = useState<string[]>(
    skill.prerequisite_skill_ids || [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/skills/${skill.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
        icon,
        order_index: orderIndex,
        difficulty,
        max_crowns: maxCrowns,
        base_xp_reward: baseXpReward,
        xp_per_crown: xpPerCrown,
        version,
        tags,
        metadata,
        prerequisite_skill_ids: prerequisiteSkillIds,
        course_id: skill.course_id,
        unit_id: skill.unit_id,
      }),
    });

    if (res.ok) {
      router.refresh();
      router.push(
        `/dashboard/courses/${skill.course_id}/units/${skill.unit_id}`,
      );
    } else {
      console.error("Failed to update skill");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Icon</label>
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Order</label>
          <input
            type="number"
            value={orderIndex}
            onChange={(e) => setOrderIndex(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Difficulty</label>
          <input
            type="number"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Max Crowns</label>
          <input
            type="number"
            value={maxCrowns}
            onChange={(e) => setMaxCrowns(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Base XP</label>
          <input
            type="number"
            value={baseXpReward}
            onChange={(e) => setBaseXpReward(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">XP per Crown</label>
          <input
            type="number"
            value={xpPerCrown}
            onChange={(e) => setXpPerCrown(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Version</label>
          <input
            type="number"
            value={version}
            onChange={(e) => setVersion(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Tags (comma separated)</label>
        <input
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            )
          }
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Metadata (JSON)</label>
        <textarea
          value={JSON.stringify(metadata, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setMetadata(parsed);
            } catch {
              // do nothing for invalid JSON
            }
          }}
          className="w-full border px-3 py-2 rounded font-mono text-sm"
          rows={4}
        />
      </div>

      <div>
        <label className="block font-medium">
          Prerequisite Skill IDs (comma-separated UUIDs)
        </label>
        <input
          value={prerequisiteSkillIds.join(", ")}
          onChange={(e) =>
            setPrerequisiteSkillIds(
              e.target.value
                .split(",")
                .map((id) => id.trim())
                .filter(Boolean),
            )
          }
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
