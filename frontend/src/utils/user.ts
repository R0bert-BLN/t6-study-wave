import type { User } from "@/types/resources/user.ts";

export const getUserFullName = (user?: User | null): string => {
  if (!user) {
    return "";
  }

  return `${user.firstName} ${user.lastName}`;
};

export const getUserInitials = (user?: User | null): string => {
  if (!user) {
    return "";
  }

  const firstInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : "";
  const lastInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : "";

  return `${firstInitial}${lastInitial}`;
};
