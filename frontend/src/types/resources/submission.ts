import type { Assignment } from "@/types/resources/assignment.ts";
import type { User } from "@/types/resources/user.ts";
import type { Attachment } from "@/types/resources/attachment.ts";

export interface Submission {
  id: string;
  assignment?: Assignment | null;
  submittedBy?: User | null;
  grade?: number;
  submittedAt?: string | null;
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionPayload {
  assignmentId: string;
  attachments?: File[];
}
