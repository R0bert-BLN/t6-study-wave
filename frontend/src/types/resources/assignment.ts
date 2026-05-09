import type { Course } from "@/types/resources/course.ts";
import type { User } from "@/types/resources/user.ts";
import type { Attachment } from "@/types/resources/attachment.ts";
import type { Comment } from "@/types/resources/comment.ts";

export interface Assignment {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  dueDate?: string | null;
  course?: Course | null;
  createdBy?: User | null;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
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
