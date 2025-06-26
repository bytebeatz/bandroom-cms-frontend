// src/app/dashboard/skills/new/page.tsx

import { notFound } from "next/navigation";
import { requireAdmin, getAccessTokenFromCookies } from "@/lib/auth";
import SkillForm from "@/components/forms/SkillForm";

export default async function NewSkillPage(props: {
  searchParams: Promise<{ courseId?: string; unitId?: string }>;
}) {
  const { courseId, unitId } = await props.searchParams;

  if (!courseId || !unitId) return notFound();

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  // Optional: fetch course or unit info to display
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
      <h1 className="text-2xl font-bold mb-6">
        Add Skill to: <span className="text-blue-600">{course.title}</span>
      </h1>
      <SkillForm courseId={courseId} unitId={unitId} />
    </div>
  );
}
