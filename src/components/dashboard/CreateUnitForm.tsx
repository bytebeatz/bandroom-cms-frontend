// components/dashboard/CreateUnitForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUnitForm({ courseId }: { courseId: string }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [orderIndex, setOrderIndex] = useState(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      course_id: courseId,
      title,
      description,
      order_index: Number(orderIndex),
    };

    const res = await fetch("/api/units", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push(`/dashboard/courses/${courseId}`);
    } else {
      alert("Failed to create unit.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-6 py-10 space-y-8"
    >
      <h1 className="text-2xl font-bold">Add New Unit</h1>

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
          Create Unit
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-zinc-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
