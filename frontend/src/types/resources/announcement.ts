import type { Course } from "@/types/resources/course.ts";
import type { User } from "@/types/resources/user.ts";
import type { Comment } from "@/types/resources/comment.ts";

export interface Announcement {
  id: string;
  body: string;
  course?: Course | null;
  createdBy?: User | null;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface AnnouncementPayload {
  courseId: string;
  body: string;
  createdBy: string;
}
