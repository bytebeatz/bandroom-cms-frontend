import { fetchLessonById } from "@/lib/api";
import EditLessonForm from "@/components/dashboard/EditLessonForm";
import { notFound } from "next/navigation";

export default async function EditLessonPage({
  params,
}: {
  params: {
    courseId: string;
    unitId: string;
    skillId: string;
    lessonId: string;
  };
}) {
  const { courseId, unitId, skillId, lessonId } = params;

  const lesson = await fetchLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-zinc-800 mb-6">
        Edit Lesson: {lesson.title}
      </h1>

      <EditLessonForm
        courseId={courseId}
        unitId={unitId}
        skillId={skillId}
        lesson={lesson}
      />
    </div>
  );
}
