import type { JSX } from "react";
import type { Course } from "@/types/resources/course.ts";
import CourseCard from "@/components/elements/course-card.tsx";
import NotFound from "@/components/elements/not-found.tsx";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps): JSX.Element {
  if (!courses || courses.length === 0) {
    return <NotFound message={"No courses found."} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  );
}
