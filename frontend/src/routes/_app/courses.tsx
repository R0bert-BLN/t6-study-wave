import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import Header from "@/components/elements/header.tsx";
import { useGetAllCourses } from "@/hooks/resources/course/use-course-query.ts";
import { CourseGrid } from "@/features/courses/list/course-grid.tsx";
import { useModal } from "@/providers/modal/use-modal.ts";
import CourseForm from "@/features/courses/create/course-form.tsx";
import { useAuth } from "@/providers/auth/use-auth.ts";

export const Route = createFileRoute("/_app/courses")({
  component: CoursesPage,
});

function CoursesPage(): JSX.Element {
  const { openModal } = useModal();
  const { user } = useAuth();

  const { data: courses, filters } = useGetAllCourses({
    include: "createdBy",
    filters: { is_archived: false, enrolled_user_id: user?.id ?? "" },
  });

  return (
    <div className="main-container flex h-screen flex-col">
      <Header
        className="pb-10"
        title="Courses"
        subtitle="Manage your ongoing courses and students"
        buttonText="Create Course"
        onButtonClick={() => openModal(<CourseForm />)}
        onSearch={(value) => filters.setFilter("name", value)}
      />

      <div className="no-scrollbar flex-1 overflow-y-auto">
        <CourseGrid courses={courses || []} />
      </div>
    </div>
  );
}
