// src/app/dashboard/units/new/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";
import UnitForm from "@/components/forms/UnitForm";

export default async function NewUnitPage(props: {
  searchParams: Promise<{ courseId?: string }>;
}) {
  const { courseId } = await props.searchParams;

  if (!courseId) return notFound();

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  const res = await fetch(
    `${process.env.CMS_API_URL}/api/courses/${courseId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) return notFound();

  const course = await res.json();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back link */}
      <div className="mb-4">
        <Link
          href={`/dashboard/courses/${courseId}`}
          className="inline-flex items-center text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          ← Back to Course
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        Add Unit to: <span className="text-blue-600">{course.title}</span>
      </h1>

      {/* Form */}
      <UnitForm courseId={courseId} />
    </div>
  );
}
