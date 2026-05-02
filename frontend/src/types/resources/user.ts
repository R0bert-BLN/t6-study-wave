import type { Course } from "@/types/resources/course.ts";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  courses?: Course[] | null;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const UserRole = {
  STUDENT: 1,
  PROFESSOR: 2,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
