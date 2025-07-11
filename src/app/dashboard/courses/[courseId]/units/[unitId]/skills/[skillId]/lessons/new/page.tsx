import CreateLessonForm from "@/components/dashboard/CreateLessonForm";

export default async function NewLessonPage({
  params,
}: {
  params: {
    courseId: string;
    unitId: string;
    skillId: string;
  };
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-zinc-800 mb-6">
        Create Lesson
      </h1>
      <CreateLessonForm
        courseId={params.courseId}
        unitId={params.unitId}
        skillId={params.skillId}
      />
    </div>
  );
}
