import type { Course } from "@/types/resources/course.ts";
import type { User } from "@/types/resources/user.ts";
import type { Attachment } from "@/types/resources/attachment.ts";
import type { Comment } from "@/types/resources/comment.ts";

export interface Material {
  id: string;
  title: string;
  description?: string | null;
  course?: Course | null;
  category: string;
  createdBy?: User | null;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
  comments?: Comment[];
}

export interface MaterialPayload {
  title: string;
  description?: string | null;
  courseId: string;
  category: string;
  createdBy: string;
  attachments?: File[];
  deletedAttachments?: string[];
}
