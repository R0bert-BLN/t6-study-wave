import { type JSX, useState } from "react";
import { Route } from "@/routes/_app/courses/$courseId";
import { useGetAllAssignments } from "@/hooks/resources/assignment/use-assignment-query.ts";
import { AssignmentsList } from "@/features/courses/details/grades/assignments-list.tsx";
import SubmissionsGrid from "@/features/courses/details/grades/submissions-grid.tsx";

export default function GradesTab(): JSX.Element {
  const { courseId } = Route.useParams();
  const { data: assignments } = useGetAllAssignments({
    filters: { course_id: courseId },
    include: "submissions,submissions.submittedBy,course",
  });

  const [activeAssignmentId, setActiveAssignmentId] = useState<string | undefined>(
    assignments?.[0]?.id,
  );
  const resolvedActiveId = activeAssignmentId ?? assignments?.[0]?.id;
  const activeAssignment = assignments?.find((a) => a.id === resolvedActiveId);
  const currentSubmissions = activeAssignment?.submissions ?? [];

  if (!activeAssignment) return <div>No assignments found.</div>;

  return (
    <div className="animate-in fade-in flex w-full items-start gap-12 pt-8 duration-500">
      <div className="w-[280px] shrink-0">
        <AssignmentsList
          assignments={assignments ?? []}
          activeId={activeAssignmentId}
          onSelect={setActiveAssignmentId}
        />
      </div>

      <div className="flex w-full flex-1 flex-col">
        <div className="mb-6 flex items-end justify-between border-b border-zinc-200 pr-4 pb-4">
          <span className="text-lg font-bold text-zinc-900">Grading: {activeAssignment.title}</span>
        </div>

        {currentSubmissions.length > 0 ? (
          <SubmissionsGrid assignment={activeAssignment} submissions={currentSubmissions} />
        ) : (
          <div className="flex flex-col items-center justify-center pt-4 text-zinc-500">
            <p className="text-sm">No submissions available for this assignment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
