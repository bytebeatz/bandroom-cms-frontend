// src/app/dashboard/skills/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { getAccessTokenFromCookies, requireAdmin } from "@/lib/auth";

interface Skill {
  id: string;
  title: string;
  icon: string;
  slug: string;
  order_index: number;
  difficulty: number;
  max_crowns: number;
  base_xp_reward: number;
  xp_per_crown: number;
  tags: string[];
  version: number;
  unit_id: string;
  course_id: string;
  metadata: Record<string, any>;
}

export default async function SkillDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const skillId = params.id;

  await requireAdmin();
  const token = await getAccessTokenFromCookies();

  const res = await fetch(`${process.env.CMS_API_URL}/api/skills/${skillId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return notFound();
  const skill: Skill = await res.json();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/dashboard/units/${skill.unit_id}`}
          className="inline-flex items-center text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          ← Back to Unit
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">Skills</h1>
        <Link
          href={`/dashboard/skills/${skill.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
        >
          Edit
        </Link>
      </div>

      <div className="grid gap-2 text-base text-gray-600 dark:text-gray-300 mb-8">
        <div>
          Skill title:<strong> {skill.title}</strong>
        </div>
        <div>
          Slug:<strong> {skill.slug}</strong>
        </div>
        <div>
          Order Index:<strong> {skill.order_index}</strong>
        </div>
        <div>
          Difficulty:<strong> {skill.difficulty}</strong>
        </div>
        <div>
          Max Crowns:<strong> {skill.max_crowns}</strong>
        </div>
        <div>
          XP / Crown:<strong> {skill.xp_per_crown}</strong>
        </div>
        <div>
          Base XP:<strong> {skill.base_xp_reward}</strong>
        </div>
        <div>
          Tags:
          <strong>
            {" "}
            {skill.tags && skill.tags.length > 0
              ? skill.tags.join(", ")
              : "None"}
          </strong>
        </div>
        <div>
          Version:<strong> {skill.version} </strong>
        </div>
        <div>
          Metadata:
          <strong>
            {" "}
            {skill.metadata && Object.keys(skill.metadata).length > 0
              ? JSON.stringify(skill.metadata)
              : "None"}
          </strong>
        </div>
      </div>
    </div>
  );
}
