import type { User } from "@/types/resources/user.ts";

export interface Course {
  id: string;
  name: string;
  description: string;
  code: string;
  isArchived: boolean;
  createdBy?: User | null;
  participants?: User[] | null;
  createdAt: string;
  updatedAt: string;
}
