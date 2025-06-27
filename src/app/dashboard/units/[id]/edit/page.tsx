// src/app/dashboard/units/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";
import UnitForm from "@/components/forms/UnitForm";

interface Unit {
  id: string;
  title: string;
  order_index: number;
  course_id: string;
}

export default async function EditUnitPage(props: {
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Unit</h1>
      <UnitForm
        unitId={unit.id}
        courseId={unit.course_id}
        defaultValues={{
          title: unit.title,
          orderIndex: unit.order_index,
        }}
      />
    </div>
  );
}
