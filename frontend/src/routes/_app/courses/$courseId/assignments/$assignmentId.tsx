import { createFileRoute } from "@tanstack/react-router";
import { JSX } from "react";
import { useGetAssignmentById } from "@/hooks/resources/assignment/use-assignment-query.ts";
import { BackButton } from "@/components/elements/back-button.tsx";
import Header from "@/components/elements/header.tsx";
import AssignmentDetails from "@/features/assignments/assignment-details.tsx";
import SubmissionBox from "@/components/elements/submission-box.tsx";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { useGetAllSubmissions } from "@/hooks/resources/submission/use-submission-query.ts";

export const Route = createFileRoute("/_app/courses/$courseId/assignments/$assignmentId")({
  component: AssignmentDetailsPage,
});

function AssignmentDetailsPage(): JSX.Element | null {
  const { isProfessor, user } = useAuth();
  const { assignmentId } = Route.useParams();
  const { data: assignment, isLoading } = useGetAssignmentById(assignmentId);
  const { data: submissions } = useGetAllSubmissions({
    filters: {
      assignment_id: assignmentId,
      submitted_by: user?.id ?? "",
    },
    include: "attachments",
  });

  if (isLoading || !assignment) {
    return null;
  }

  return (
    <div className="main-container flex h-screen w-full flex-col">
      <BackButton className="mb-4" />
      <Header
        title={assignment.title}
        subtitle={assignment.course?.name}
        className="mb-2 border-b border-gray-200 pb-7"
      />

      <div className="flex flex-1 gap-12 overflow-hidden">
        <AssignmentDetails assignment={assignment} />

        {!isProfessor && <SubmissionBox assignment={assignment} submission={submissions?.[0]} />}
      </div>
    </div>
  );
}
