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
  const [orderIndex, setOrderIndex] = useState(1);
  const [icon, setIcon] = useState("🎯");
  const [difficulty, setDifficulty] = useState(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: courseId,
        unit_id: unitId,
        title,
        icon,
        order_index: orderIndex,
        difficulty,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="title"
        placeholder="Skill title (e.g. Time Signatures)"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        name="icon"
        placeholder="Icon (emoji or name)"
        className="w-full border p-2 rounded"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
      />
      <input
        name="orderIndex"
        type="number"
        placeholder="Order Index"
        className="w-full border p-2 rounded"
        value={orderIndex}
        onChange={(e) => setOrderIndex(e.target.valueAsNumber)}
        required
      />
      <input
        name="difficulty"
        type="number"
        placeholder="Difficulty (1–5)"
        className="w-full border p-2 rounded"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.valueAsNumber)}
        min={1}
        max={5}
        required
      />
      <button
        type="submit"
        className="w-full bg-black dark:bg-white text-white dark:text-black p-2 rounded hover:opacity-90"
      >
        Create Skill
      </button>
    </form>
  );
}
