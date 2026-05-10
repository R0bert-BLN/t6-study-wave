import type { JSX } from "react";
import { cn } from "@/lib/utils";
import type { Assignment } from "@/types/resources/assignment.ts";

interface AssignmentsListProps {
  assignments: Assignment[];
  activeId?: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function AssignmentsList({
  assignments,
  activeId,
  onSelect,
  className,
}: AssignmentsListProps): JSX.Element {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <span className="px-4 text-[11px] font-bold tracking-[0.1em] text-zinc-400 uppercase">
        Assignments
      </span>

      <div className="flex flex-col gap-1">
        {assignments.map((assignment) => {
          const isActive = assignment.id === activeId;

          return (
            <button
              key={assignment.id}
              onClick={() => onSelect(assignment.id)}
              className={cn(
                "flex cursor-pointer flex-col items-start rounded-md px-4 py-3 text-left transition-all duration-200",
                isActive ? "bg-gray-100" : "",
              )}
            >
              <span className="text-[14px] font-bold text-zinc-900">{assignment.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
