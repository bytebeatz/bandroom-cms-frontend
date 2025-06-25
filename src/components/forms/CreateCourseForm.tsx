"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="slug"
        placeholder="Slug (e.g. intro-to-rhythm)"
        value={form.slug}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="language"
        placeholder="Language (e.g. en)"
        value={form.language}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="difficulty"
        placeholder="Difficulty (1-5)"
        value={form.difficulty}
        onChange={handleChange}
        type="number"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="icon"
        placeholder="Icon (e.g. drum)"
        value={form.icon}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="estimatedMinutes"
        placeholder="Estimated Time (minutes)"
        value={form.estimatedMinutes}
        onChange={handleChange}
        type="number"
        className="w-full p-2 border rounded"
      />
      <label className="flex items-center space-x-2">
        <input
          name="isPublished"
          type="checkbox"
          checked={form.isPublished}
          onChange={handleChange}
        />
        <span>Publish now?</span>
      </label>
      <button
        type="submit"
        className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:opacity-90"
      >
        {courseId ? "Update Course" : "Create Course"}
      </button>
    </form>
  );
}
