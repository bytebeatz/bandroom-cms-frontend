// app/dashboard/courses/[courseId]/units/[unitId]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchUnitById, Unit } from "@/lib/api";

export default async function UnitDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; unitId: string }>;
}) {
  const { courseId, unitId } = await params;

  const unit: Unit | null = await fetchUnitById(unitId);

  if (!unit) {
    notFound();
  }

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-zinc-700">
          {unit.order_index}. {unit.title}
        </h1>
        <Link
          href={`/dashboard/courses/${courseId}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Course
        </Link>
      </div>

      <p className="text-zinc-600 mb-4">
        {unit.description || "No description"}
      </p>

      <div className="text-sm text-zinc-500 space-y-2">
        <p>
          <strong>Version:</strong> {unit.version}
        </p>
        <p>
          <strong>Created:</strong> {new Date(unit.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong> {new Date(unit.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
