import type { User } from "@/types/resources/user.ts";
import { createContext } from "react";

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  isProfessor: boolean;
}

export const AuthContext = createContext<AuthContext | null>(null);
