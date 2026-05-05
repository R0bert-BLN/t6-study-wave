import type { User } from "@/types/resources/user.ts";

export interface Note {
  id: string;
  title: string;
  body: string;
  createdBy?: User | null;
  category?: string | null;
  createdAt: string;
  updateAt: string;
}
