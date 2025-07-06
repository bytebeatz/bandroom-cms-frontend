"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCourseForm({ initialData }: { initialData: any }) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData.title);
  const [slug, setSlug] = useState(initialData.slug);
  const [description, setDescription] = useState(initialData.description);
  const [language, setLanguage] = useState(initialData.language);
  const [difficulty, setDifficulty] = useState(initialData.difficulty);
  const [tags, setTags] = useState(initialData.tags.join(", "));
  const [metadata, setMetadata] = useState(
    JSON.stringify(initialData.metadata),
  );
  const [isPublished, setIsPublished] = useState(initialData.is_published);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title,
      slug,
      description,
      language,
      difficulty,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      metadata: metadata ? JSON.parse(metadata) : {},
      is_published: isPublished,
    };

    const res = await fetch(`/api/courses/${initialData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/dashboard/courses");
    } else {
      alert("Failed to update course.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Same fields as CreateCourseForm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
          <label className="font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        {/* Language */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Language</label>
          <input
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            <option value={1}>Beginner</option>
            <option value={2}>Intermediate</option>
            <option value={3}>Advanced</option>
          </select>
        </div>

        {/* Tags */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
          <label className="font-medium">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        {/* Metadata */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
          <label className="font-medium">Metadata (JSON)</label>
          <textarea
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            className="border rounded px-3 py-2 font-mono text-sm"
            rows={4}
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label className="font-medium">Publish</label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Course
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-zinc-600 text-white px-6 py-2 rounded hover:bg-zinc-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
