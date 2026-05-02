import type { JSX } from "react";
import type { Course } from "@/types/resources/course.ts";
import CourseCard from "@/components/elements/course-card.tsx";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps): JSX.Element {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 py-20 text-zinc-400">
        <p className="text-[14px] font-medium">No courses found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  );
}
