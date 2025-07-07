// app/dashboard/courses/[courseId]/units/[unitId]/edit/page.tsx
import { notFound } from "next/navigation";
import { fetchUnitById } from "@/lib/api";
import EditUnitForm from "@/components/dashboard/EditUnitForm";

export default async function EditUnitPage({
  params,
}: {
  params: { courseId: string; unitId: string };
}) {
  const { unitId } = params;
  const unit = await fetchUnitById(unitId);

  if (!unit) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Unit</h1>
      <EditUnitForm unitId={unitId} initialData={unit} />
    </div>
  );
}
