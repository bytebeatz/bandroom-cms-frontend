// components/dashboard/EditUnitForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Unit } from "@/lib/types";

type Props = {
  unitId: string;
  initialData: Unit;
};

export default function EditUnitForm({ unitId, initialData }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description || "");
  const [orderIndex, setOrderIndex] = useState(initialData.order_index);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title,
      description,
      order_index: Number(orderIndex),
    };

    const res = await fetch(`/api/units/${unitId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push(`/dashboard/courses/${initialData.course_id}`);
    } else {
      alert("Failed to update unit.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-6 py-10 space-y-8"
    >
      <h1 className="text-2xl font-bold">Edit Unit</h1>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Order Index</label>
        <input
          type="number"
          value={orderIndex}
          onChange={(e) => setOrderIndex(Number(e.target.value))}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Unit
        </button>
        <button
          type="button"
          onClick={() =>
            router.push(`/dashboard/courses/${initialData.course_id}`)
          }
          className="text-zinc-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
