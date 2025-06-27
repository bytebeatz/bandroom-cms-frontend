// src/app/dashboard/units/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";

interface Unit {
  id: string;
  title: string;
  order_index: number;
  course_id: string;
  metadata: Record<string, any>;
}

export default async function UnitDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  const res = await fetch(`${process.env.CMS_API_URL}/api/units/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const unit: Unit = await res.json();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/dashboard/courses/${unit.course_id}`}
          className="text-sm px-3 py-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ← Back to Course
        </Link>

        <div className="flex gap-2">
          <Link
            href={`/dashboard/units/${unit.id}/edit`}
            className="px-4 py-2 border text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ✎ Edit Unit
          </Link>

          <Link
            href={`/dashboard/skills/new?unitId=${unit.id}`}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded hover:opacity-90"
          >
            + Add Skill
          </Link>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {unit.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Order: {unit.order_index}
      </p>
    </div>
  );
}
