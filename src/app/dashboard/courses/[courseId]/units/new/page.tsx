// app/dashboard/courses/[courseId]/units/new/page.tsx
"use client";

import { useParams } from "next/navigation";
import CreateUnitForm from "@/components/dashboard/CreateUnitForm";

export default function NewUnitPage() {
  const { courseId } = useParams();

  if (!courseId || typeof courseId !== "string") {
    return <div>Invalid course ID</div>;
  }

  return <CreateUnitForm courseId={courseId} />;
}
