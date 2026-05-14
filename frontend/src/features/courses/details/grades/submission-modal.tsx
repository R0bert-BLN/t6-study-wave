import type { JSX } from "react";
import { useState } from "react";
import type { Submission } from "@/types/resources/submission.ts";
import type { Assignment } from "@/types/resources/assignment.ts";
import { getUserFullName } from "@/utils/user.ts";
import AttachmentCard from "@/components/elements/attachment-card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUpdateSubmission } from "@/hooks/resources/submission/use-submission-mutation.ts";
import { toast } from "sonner";
import { useModal } from "@/providers/modal/use-modal.ts";
import { useQueryClient } from "@tanstack/react-query";
import { ResourceType } from "@/types/resources/resource-type.ts";

interface SubmissionModalProps {
  submission: Submission;
  assignment: Assignment;
}

export function SubmissionModal({ submission, assignment }: SubmissionModalProps): JSX.Element {
  const { closeModal } = useModal();
  const studentName = getUserFullName(submission.submittedBy);
  const attachments = submission.attachments ?? [];
  const [gradeInput, setGradeInput] = useState<string>(
    submission.grade !== undefined && submission.grade !== null ? String(submission.grade) : "",
  );
  const { mutate: updateSubmission, isPending } = useUpdateSubmission(submission.id);
  const queryClient = useQueryClient();

  const handleGradeSubmit = () => {
    const trimmed = gradeInput.trim();
    const parsedGrade = trimmed === "" ? undefined : Math.round(Number(trimmed));

    if (trimmed !== "" && Number.isNaN(parsedGrade)) {
      toast.error("Please enter a valid grade");
      return;
    }

    updateSubmission(
      { grade: parsedGrade },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [ResourceType.Assignment] });
          toast.success("Grade updated");
          closeModal();
        },
        onError: () => {
          toast.error("Failed to update grade");
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col">
      <div className="gap- flex flex-col bg-white px-4 pt-2">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold text-zinc-900">{studentName}&apos;s Submission</span>
            <span className="text-sm text-zinc-500">
              {assignment.title} •{" "}
              {submission.submittedAt ? (
                <span className="text-green-500">Turned in</span>
              ) : (
                <span className="text-red-500">Missing</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                value={gradeInput}
                onChange={(event) => setGradeInput(event.target.value)}
                className="h-8 w-12 rounded-md border border-zinc-200 text-center text-sm font-bold text-zinc-900 transition-colors"
              />
              <span className="text-sm font-bold text-zinc-400">/ 100</span>
            </div>

            <Button className="main-btn" onClick={handleGradeSubmit} disabled={isPending}>
              Return Grade
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-bold text-zinc-900">
              Attachments ({attachments.length} files)
            </span>
          </div>

          {attachments.length > 0 ? (
            <div className="flex flex-col gap-3">
              {attachments.map((attachment) => (
                <AttachmentCard key={attachment.id} attachment={attachment} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500">
              No attachments provided.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
