"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UnitForm({
  courseId,
  unitId,
  defaultValues,
}: {
  courseId: string;
  unitId?: string;
  defaultValues?: {
    title: string;
    orderIndex: number;
  };
}) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [orderIndex, setOrderIndex] = useState(defaultValues?.orderIndex || 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = unitId ? "PUT" : "POST";
    const endpoint = unitId ? `/api/units/${unitId}` : "/api/units";

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        order_index: Number(orderIndex),
        course_id: courseId,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`${method} unit failed`, res.status, err);
      alert("Failed to save unit.");
      return;
    }

    const updated = await res.json();
    router.push(`/dashboard/units/${updated.id}`);
  };

  const handleCancel = () => {
    router.push(`/dashboard/courses/${courseId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Unit Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="e.g. Rhythm Basics"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="orderIndex" className="block font-medium mb-1">
          Order Index
        </label>
        <input
          id="orderIndex"
          name="orderIndex"
          placeholder="e.g. 1"
          type="number"
          className="w-full border p-2 rounded"
          value={orderIndex}
          onChange={(e) => setOrderIndex(e.target.valueAsNumber || 0)}
          required
        />
      </div>

      <div className="space-y-2">
        <button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black p-2 rounded hover:opacity-90"
        >
          {unitId ? "Update Unit" : "Create Unit"}
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
