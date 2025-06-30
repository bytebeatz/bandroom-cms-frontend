// src/app/dashboard/skills/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import { getAccessTokenFromCookies, requireAdmin } from "@/lib/auth";
import SkillForm from "@/components/forms/SkillForm";

interface Skill {
  id: string;
  course_id: string;
  unit_id: string;
  title: string;
  slug: string;
  icon: string;
  order_index: number;
  difficulty: number;
  max_crowns: number;
  base_xp_reward: number;
  xp_per_crown: number;
  prerequisite_skill_ids: string[];
  tags: string[];
  metadata: Record<string, any>;
  version: number;
}

export default async function EditSkillPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  const res = await fetch(`${process.env.CMS_API_URL}/api/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const skill: Skill = await res.json();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Skill</h1>
      <SkillForm
        skillId={skill.id}
        courseId={skill.course_id}
        unitId={skill.unit_id}
        defaultValues={{
          title: skill.title,
          slug: skill.slug,
          icon: skill.icon,
          orderIndex: skill.order_index,
          difficulty: skill.difficulty,
          maxCrowns: skill.max_crowns,
          baseXpReward: skill.base_xp_reward,
          xpPerCrown: skill.xp_per_crown,
          prerequisites: skill.prerequisite_skill_ids,
          tags: skill.tags,
          metadata: skill.metadata,
          version: skill.version,
        }}
      />
    </div>
  );
}
