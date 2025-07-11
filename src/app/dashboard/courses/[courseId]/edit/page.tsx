// app/dashboard/courses/[courseId]/edit/page.tsx
import { notFound } from "next/navigation";
import EditCourseForm from "@/components/dashboard/EditCourseForm";
import { fetchCourseById } from "@/lib/api";

export default async function EditCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await fetchCourseById(params.courseId);
  if (!course) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      <EditCourseForm initialData={course} />
    </div>
  );
}
