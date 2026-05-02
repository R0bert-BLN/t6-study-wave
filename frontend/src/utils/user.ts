import type { User } from "@/types/resources/user.ts";

export const getUserFullName = (user?: User | null): string => {
  if (!user) {
    return "";
  }

  return `${user.firstName} ${user.lastName}`;
};
