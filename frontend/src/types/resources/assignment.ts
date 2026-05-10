import type { Course } from "@/types/resources/course.ts";
import type { User } from "@/types/resources/user.ts";
import type { Attachment } from "@/types/resources/attachment.ts";
import type { Comment } from "@/types/resources/comment.ts";
import type { Submission } from "@/types/resources/submission.ts";

// @ts-ignore
export enum AssignmentStatus {
  ASSIGNED = "assigned",
  SUBMITTED = "submitted",
  GRADED = "graded",
  MISSING = "missing",
}

export interface Assignment {
  id: string;
  title: string;
  category: string;
  status: string;
  description?: string | null;
  dueDate?: string | null;
  course?: Course | null;
  createdBy?: User | null;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
  submissions?: Submission[];
  comments?: Comment[];
}

export interface AssignmentPayload {
  title: string;
  category: string;
  description?: string | null;
  dueDate?: string | null;
  courseId: string;
  createdBy: string;
  attachments?: File[];
  deletedAttachments?: string[];
}
