"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CourseFormProps {
  courseId?: string;
  defaultValues?: {
    title: string;
    slug: string;
    description: string;
    language: string;
    difficulty: string;
    tags: string;
    icon: string;
    estimatedMinutes: string;
    isPublished: boolean;
  };
}

export default function CreateCourseForm({
  courseId,
  defaultValues,
}: CourseFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: defaultValues?.title || "",
    slug: defaultValues?.slug || "",
    description: defaultValues?.description || "",
    language: defaultValues?.language || "en",
    difficulty: defaultValues?.difficulty || "1",
    tags: defaultValues?.tags || "",
    icon: defaultValues?.icon || "",
    estimatedMinutes: defaultValues?.estimatedMinutes || "",
    isPublished: defaultValues?.isPublished || false,
  });

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

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      language: form.language,
      difficulty: Number(form.difficulty),
      tags: form.tags.split(",").map((t) => t.trim()),
      metadata: {
        icon: form.icon,
        estimated_minutes: Number(form.estimatedMinutes),
      },
      is_published: form.isPublished,
    };

    const method = courseId ? "PUT" : "POST";
    const endpoint = courseId ? `/api/courses/${courseId}` : "/api/courses";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Failed to save course", res.status, err);
        return;
      }

      router.push("/dashboard/courses");
    } catch (error) {
      console.error("Unexpected error saving course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          name="slug"
          placeholder="e.g. intro-to-rhythm"
          value={form.slug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Language</label>
        <input
          name="language"
          placeholder="e.g. en"
          value={form.language}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Difficulty (1–5)
        </label>
        <input
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          type="number"
          min="1"
          max="5"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <input
          name="tags"
          placeholder="e.g. rhythm, notation"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Icon</label>
        <input
          name="icon"
          placeholder="e.g. drum"
          value={form.icon}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Estimated Time (minutes)
        </label>
        <input
          name="estimatedMinutes"
          value={form.estimatedMinutes}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>

      <label className="flex items-center space-x-2">
        <input
          name="isPublished"
          type="checkbox"
          checked={form.isPublished}
          onChange={handleChange}
        />
        <span>Publish now?</span>
      </label>

      <div className="flex justify-end gap-4 pt-4">
        <Link
          href="/dashboard/courses"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-90 text-sm"
        >
          {courseId ? "Update Course" : "Create Course"}
        </button>
      </div>
    </form>
  );
}
