// app/dashboard/courses/[courseId]/units/[unitId]/skills/[skillId]/edit/page.tsx

import { fetchSkillById } from "@/lib/api";
import { notFound } from "next/navigation";
import EditSkillForm from "@/components/dashboard/EditSkillForm";
import { Skill } from "@/types/skill";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{
    courseId: string;
    unitId: string;
    skillId: string;
  }>;
}) {
  const { courseId, unitId, skillId } = await params;

  const skill: Skill | null = await fetchSkillById(skillId);

  if (!skill) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-xl font-semibold mb-4">Edit Skill</h1>
      <EditSkillForm skill={skill} />
    </div>
  );
}
