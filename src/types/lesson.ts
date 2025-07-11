// types/lesson.ts
export interface Lesson {
  id: string;
  skill_id: string;
  slug: string;
  title: string;
  order_index: number;
  total_exercises: number;
  base_xp: number;
  bonus_xp: number;
  reward_gems: number;
  reward_hearts: number;
  reward_condition: string;
  estimated_duration: number;
  difficulty_rating: number;
  is_testable: boolean;
  creator_id: string;
  tags: string[];
  metadata: Record<string, any>;
  version: number;
  created_at: string;
  updated_at: string;
}
