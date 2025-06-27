// src/components/ui/DeleteUnitButton.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteUnitButton({
  unitId,
  courseId,
}: {
  unitId: string;
  courseId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this unit?");
    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/units/${unitId}`, {
        method: "DELETE",
        credentials: "include", // Needed to send access_token cookie
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Failed to delete unit", res.status, err);
        alert("Failed to delete unit.");
        return;
      }

      router.push(`/dashboard/courses/${courseId}`);
    } catch (err) {
      console.error("Unexpected error deleting unit:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-600 hover:text-red-800 ml-2"
    >
      🗑
    </button>
  );
}
