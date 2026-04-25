import { useState, useEffect, type ReactNode, type JSX } from "react";
import type { User } from "@/types/resources/user.ts";
import { authService } from "@/servicies/auth/auth.ts";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .me()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const loginUser = (userData: User) => setUser(userData);
  const logoutUser = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
