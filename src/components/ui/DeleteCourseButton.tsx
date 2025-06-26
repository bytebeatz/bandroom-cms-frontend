"use client";

import { useRouter } from "next/navigation";

export default function DeleteCourseButton({ courseId }: { courseId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Failed to delete course", res.status, err);
        alert("Failed to delete course.");
        return;
      }

      router.push("/dashboard/courses");
    } catch (error) {
      console.error("Unexpected error deleting course:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center text-sm px-4 py-2 border border-red-300 text-red-700 dark:border-red-600 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900 transition"
    >
      🗑 Delete
    </button>
  );
}
