import type { Course } from "@/types/resources/course.ts";
import type { JSX } from "react";
import { getUserFullName } from "@/utils/user.ts";
import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { useUpdateCourse } from "@/hooks/resources/course/use-course-mutation.ts";
import { toast } from "sonner";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps): JSX.Element {
  const { isProfessor, user } = useAuth();
  const { mutate: updateCourse } = useUpdateCourse(course.id);

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
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/70 transition-all outline-none hover:bg-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <EllipsisVertical size={20} className="text-xl" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="center"
              className="w-40 rounded-xl border-zinc-100 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {isProfessor && (
                <DropdownMenuItem
                  onClick={archiveCourse}
                  disabled={course.createdBy?.id !== user?.id}
                  className="cursor-pointer py-1 text-[13px]"
                >
                  Archive
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={() => alert("Leave course functionality not implemented yet")}
                className="cursor-pointer py-1 text-[13px] text-rose-600 focus:bg-rose-50 focus:text-rose-700"
              >
                Leave
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
