import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { useGetAllCourses } from "@/hooks/resources/course/use-course-query.ts";
import Header from "@/components/elements/header.tsx";
import { CourseGrid } from "@/features/courses/list/course-grid.tsx";
import SearchBar from "@/components/elements/search-bar.tsx";

export const Route = createFileRoute("/_app/archived")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  const { data: courses, filters } = useGetAllCourses({
    include: "createdBy",
    filters: { is_archived: true, enrolled_user_id: user?.id ?? "" },
  });

  return (
    <div className="main-container flex h-screen flex-col">
      <Header className="pb-8" title="Archived Courses" subtitle="View your archived courses" />

      <div className="pb-10">
        <SearchBar className="w-full" onSearch={(value) => filters.setFilter("name", value)} />
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto">
        <CourseGrid courses={courses || []} />
      </div>
    </div>
  );
}
