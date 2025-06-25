"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    language: "en",
    difficulty: 1,
    is_published: false,
    tags: "",
    icon: "",
    estimated_minutes: 15,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      ...form,
      difficulty: Number(form.difficulty),
      tags: form.tags.split(",").map((t) => t.trim()),
      metadata: {
        icon: form.icon,
        estimated_minutes: Number(form.estimated_minutes),
      },
    };

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create course");
      return;
    }

    router.push("/dashboard/courses");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            placeholder="Intro to Rhythm"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Slug</label>
          <input
            name="slug"
            placeholder="intro-to-rhythm"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Brief overview of the course..."
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Language</label>
          <input
            name="language"
            placeholder="e.g. en, es, fr"
            value={form.language}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">
            Difficulty{" "}
            <span className="text-gray-500">(1 = Easy, 5 = Expert)</span>
          </label>
          <input
            name="difficulty"
            type="number"
            min="1"
            max="5"
            value={form.difficulty}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Tags</label>
          <input
            name="tags"
            placeholder="e.g. rhythm, notation"
            value={form.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Icon</label>
          <input
            name="icon"
            placeholder="e.g. drum, note, clef"
            value={form.icon}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">
            Estimated Time (minutes)
          </label>
          <input
            name="estimated_minutes"
            type="number"
            value={form.estimated_minutes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
          />
          <label className="text-sm">Publish now?</label>
        </div>

        <button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black p-2 rounded hover:opacity-90"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
