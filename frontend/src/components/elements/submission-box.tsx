import { type Assignment, AssignmentStatus } from "@/types/resources/assignment.ts";
import { JSX, useState } from "react";
import FileUpload from "@/components/elements/file-upload.tsx";
import { Button } from "@/components/ui/button.tsx";
import { capitalizeWords } from "@/utils/string.ts";
import { cn } from "@/lib/utils.ts";
import type { Submission } from "@/types/resources/submission.ts";
import { useCreateSubmission } from "@/hooks/resources/submission/use-submission-mutation.ts";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ResourceType } from "@/types/resources/resource-type.ts";

interface SubmissionBoxProps {
  assignment: Assignment;
  submission?: Submission;
}

export default function SubmissionBox({ assignment, submission }: SubmissionBoxProps): JSX.Element {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { mutate: createSubmission } = useCreateSubmission();
  const queryClient = useQueryClient();
  const currentExistingAttachments = submission?.attachments ?? [];

  const handleSubmit = () => {
    createSubmission(
      {
        assignmentId: assignment.id,
        attachments: selectedFiles,
      },
      {
        onSuccess: () => {
          setSelectedFiles([]);
          queryClient.invalidateQueries({ queryKey: [ResourceType.Assignment, assignment.id] });
          toast.success("Submission successful");
        },
        onError: () => {
          toast.error("Failed to submit assignment");
        },
      },
    );
  };

  return (
    <div className="mt-5 flex h-fit w-90 flex-col gap-4 rounded-4xl border-1 border-gray-200 p-5">
      <div className="flex w-full items-center justify-between">
        <span className="text-left text-lg font-semibold">Your Work</span>
        <span
          className={cn("text-sm", {
            "text-green-500":
              assignment.status === AssignmentStatus.ASSIGNED ||
              assignment.status === AssignmentStatus.SUBMITTED,
            "text-red-500": assignment.status === AssignmentStatus.MISSING,
          })}
        >
          {capitalizeWords(assignment.status)}
        </span>
      </div>

      <FileUpload
        disabled={assignment.status !== AssignmentStatus.ASSIGNED}
        selectedFiles={selectedFiles}
        onFilesSelected={setSelectedFiles}
        existingAttachments={currentExistingAttachments}
      />

      <Button
        disabled={selectedFiles.length === 0 || assignment.status !== AssignmentStatus.ASSIGNED}
        type="button"
        onClick={() => handleSubmit()}
        className="main-btn px-4"
      >
        Turn In
      </Button>
    </div>
  );
}
