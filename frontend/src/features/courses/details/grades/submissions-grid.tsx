import type { JSX } from "react";
import { cn } from "@/lib/utils";
import type { Assignment } from "@/types/resources/assignment.ts";
import type { Submission } from "@/types/resources/submission.ts";
import { UserAvatar } from "@/components/elements/user-avatar.tsx";
import { getUserFullName, getUserInitials } from "@/utils/user.ts";
import { useFileHandler } from "@/hooks/general/use-file-handler.ts";
import { useModal } from "@/providers/modal/use-modal.ts";
import { SubmissionModal } from "@/features/courses/details/grades/submission-modal.tsx";

interface SubmissionsGridProps {
  assignment: Assignment;
  submissions: Submission[];
}

export default function SubmissionsGrid({
  submissions,
  assignment,
}: SubmissionsGridProps): JSX.Element {
  const { openModal } = useModal();
  const { getInlineFileUrl } = useFileHandler();

  const handleRowClick = (submission: Submission) => {
    if (!assignment.course?.isArchived) {
      openModal(
        <SubmissionModal submission={submission} assignment={assignment} />,
        "!max-w-[800px]",
      );
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 border-b border-zinc-200 px-4 pb-4">
        <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
          Student
        </span>
        <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
          Status
        </span>
        <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
          Grade (100 Max)
        </span>
      </div>

      <div className="flex flex-col py-2">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            onClick={() => handleRowClick(submission)}
            className="group grid cursor-pointer grid-cols-[2fr_1fr_1fr] items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:opacity-70"
          >
            <div className="flex items-center gap-4">
              <UserAvatar
                label={getUserInitials(submission.submittedBy)}
                src={getInlineFileUrl(submission.submittedBy?.avatarUrl ?? "")}
                className="h-9 w-9"
              />

              <span className="text-[14px] font-bold text-zinc-900">
                {getUserFullName(submission.submittedBy)}
              </span>
            </div>

            <div>
              <span
                className={cn(
                  "text-[13px] font-bold",
                  submission.submittedAt && "text-emerald-600",
                  !submission.submittedAt && "text-rose-500",
                )}
              >
                {submission.submittedAt ? "Turned In" : "Missing"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-900">
                {submission.grade !== null ? submission.grade : "--"}
              </span>

              <span className="text-sm font-medium text-zinc-400">/ 100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
