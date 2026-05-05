import type { Assignment } from "@/types/resources/assignment.ts";
import type { User } from "@/types/resources/user.ts";

export interface Submission {
  id: string;
  assignment?: Assignment | null;
  submittedBy?: User | null;
  grade: number;
  submittedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
