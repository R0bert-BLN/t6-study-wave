import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LoginCredentials } from "@/types/auth/auth.ts";
import type { User } from "@/types/resources/user.ts";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/general/api.ts";
import { authService } from "@/servicies/auth/auth.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";

export const useLogin = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  return useMutation({
    mutationFn: (data: LoginCredentials): Promise<User> => authService.login(data),

    onSuccess: (data: User): void => {
      loginUser(data);
      navigate({ to: "/courses" });
    },

    onError: (error: AxiosError<ApiError>): void => {
      toast.error(error.response?.data?.error.message || "Something went wrong");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<void> => authService.logout(),

    onSuccess: (): void => {
      logoutUser();
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });
};
