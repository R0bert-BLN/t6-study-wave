import type { User } from "@/types/resources/user.ts";

export interface Reminder {
  id: string;
  title: string;
  description?: string | null;
  scheduledAt: string;
  createdBy?: User | null;
  createdAt: string;
  updatedAt: string;
}
