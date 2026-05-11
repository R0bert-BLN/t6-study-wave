import type { Course } from "@/types/resources/course.ts";
import type { JSX } from "react";
import { getUserFullName } from "@/utils/user.ts";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { useLeaveCourse, useUpdateCourse } from "@/hooks/resources/course/use-course-mutation.ts";
import { toast } from "sonner";
import ActionMenu from "@/components/elements/action-menu.tsx";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps): JSX.Element {
  const { isProfessor, user } = useAuth();
  const { mutate: updateCourse } = useUpdateCourse(course.id);
  const { mutate: leaveCourse } = useLeaveCourse();

  const archiveCourse = () => {
    updateCourse(
      { isArchived: true },
      {
        onSuccess: () => {
          toast.success("Course archived successfully");
        },
        onError: () => {
          toast.error("Failed to archive course");
        },
      },
    );
  };

  if (course.isArchived) {
    return (
      <Link
        to={`/courses/${course.id}`}
        className="group focus-visible:ring-ring relative block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div className="flex h-60 flex-col justify-end rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 pt-2 pr-2 pb-4 pl-4 shadow-gray-400/25 transition-all duration-300 hover:opacity-90">
          <div className="flex flex-col gap-1">
            <p className="line-clamp-2 text-xl leading-tight font-bold tracking-tight text-white drop-shadow-sm">
              {course.name}
            </p>

            <p className="flex items-center gap-1.5 text-[13px] font-medium text-white/90">
              <span>Prof. {getUserFullName(course.createdBy)}</span>
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group focus-visible:ring-ring relative block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="flex h-60 flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 pt-2 pr-2 pb-4 pl-4 shadow-blue-500/25 transition-all duration-300 hover:opacity-90">
        <ActionMenu
          align="center"
          items={[
            ...(isProfessor
              ? [
                  {
                    label: "Archive",
                    onClick: archiveCourse,
                    disabled: course.createdBy?.id !== user?.id,
                  },
                ]
              : []),
            {
              label: "Leave",
              destructive: true,
              onClick: () =>
                leaveCourse(course.id, {
                  onSuccess: () => {
                    toast.success("Left course successfully");
                  },
                  onError: () => {
                    toast.error("Failed to leave course");
                  },
                }),
            },
          ]}
        />

        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 text-xl leading-tight font-bold tracking-tight text-white drop-shadow-sm">
            {course.name}
          </p>

          <p className="flex items-center gap-1.5 text-[13px] font-medium text-white/90">
            <span>Prof. {getUserFullName(course.createdBy)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
