import type { JSX } from "react";
import { Download } from "lucide-react"; // Am scos X-ul de aici
import type { Submission } from "@/types/resources/submission.ts";
import type { Assignment } from "@/types/resources/assignment.ts";
import { getUserFullName } from "@/utils/user.ts";
import AttachmentCard from "@/components/elements/attachment-card.tsx";

interface SubmissionModalProps {
  submission: Submission;
  assignment: Assignment;
}

export function SubmissionModal({ submission, assignment }: SubmissionModalProps): JSX.Element {
  const studentName = getUserFullName(submission.submittedBy);
  const attachments = submission.attachments ?? [];

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-start justify-between border-b border-zinc-100 bg-zinc-50/50 p-6 pr-12">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold text-zinc-900">{studentName}'s Submission</span>
          <span className="text-sm text-zinc-500">
            {assignment.title} • {submission.submittedAt ? "Turned in" : "Missing"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              defaultValue={submission.grade ?? ""}
              placeholder="--"
              className="h-10 w-16 rounded-md border border-zinc-200 text-center text-sm font-bold text-zinc-900 transition-colors focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="text-sm font-bold text-zinc-400">/ 100</span>
          </div>

          <button className="h-10 rounded-full bg-zinc-900 px-6 text-sm font-bold text-white shadow-sm transition-all hover:bg-zinc-800">
            Return Grade
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex flex-col">
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

        {attachments.length > 0 && (
          <button
            onClick={() => alert("Download all files as ZIP functionality not implemented yet")}
            className="mt-8 flex items-center gap-2 text-[14px] font-bold text-blue-600 transition-colors hover:text-blue-800"
          >
            <Download size={18} />
            Download all files (ZIP)
          </button>
        )}
      </div>
    </div>
  );
}
