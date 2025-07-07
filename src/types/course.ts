export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  language: string;
  difficulty: number;
  is_published: boolean;
  tags: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
};
