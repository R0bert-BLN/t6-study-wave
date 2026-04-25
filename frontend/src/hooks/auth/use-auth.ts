import { AuthContext } from "@/providers/auth/auth-context.ts";
import { useContext } from "react";

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
