"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UnitForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [orderIndex, setOrderIndex] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/units", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_id: courseId,
        title,
        order_index: Number(orderIndex),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Failed to create unit", res.status, err);
      return;
    }

    const created = await res.json();
    router.push(`/dashboard/units/${created.id}`);
  };

  const handleCancel = () => {
    router.push("/dashboard/courses"); // 👈 back to course list
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="title"
        placeholder="Unit title (e.g. Rhythm Basics)"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        name="orderIndex"
        placeholder="Order Index"
        type="number"
        className="w-full border p-2 rounded"
        value={orderIndex}
        onChange={(e) => setOrderIndex(e.target.valueAsNumber)}
        required
      />

      <div className="space-y-2">
        <button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black p-2 rounded hover:opacity-90"
        >
          Create Unit
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
