import type { User } from "@/types/resources/user.ts";

export interface Comment {
  id: string;
  commentableId: string;
  commentableType: string;
  body: string;
  createdBy?: User | null;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}
