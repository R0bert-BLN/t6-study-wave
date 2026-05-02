import { useState, useEffect, type ReactNode, type JSX } from "react";
import { type User, UserRole } from "@/types/resources/user.ts";
import { authService } from "@/servicies/auth/auth.ts";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
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
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginUser,
        logoutUser,
        isProfessor: user?.role === UserRole.PROFESSOR,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
