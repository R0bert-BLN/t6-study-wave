export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export const UserRole = {
  STUDENT: 1,
  PROFESSOR: 2,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
