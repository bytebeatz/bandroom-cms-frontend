"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCourseForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("en");
  const [difficulty, setDifficulty] = useState(1);
  const [tags, setTags] = useState("");
  const [metadata, setMetadata] = useState("");
  const [isPublished, setIsPublished] = useState(false);

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

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/dashboard/courses");
    } else {
      alert("Failed to create course.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto px-6 py-10 space-y-8"
    >
      <h1 className="text-2xl font-bold">Create New Course</h1>

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
            placeholder='e.g. {"icon":"🎤","estimated_minutes":15}'
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

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Create Course
      </button>
    </form>
  );
}
