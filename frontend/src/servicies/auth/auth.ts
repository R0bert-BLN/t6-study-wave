import type { AxiosResponse } from "axios";
import apiClient from "@/lib/axios.ts";
import type { LoginCredentials } from "@/types/auth/auth.ts";
import type { User } from "@/types/resources/user.ts";

export const authService = {
  getCsrf: (): Promise<AxiosResponse> => apiClient.get("/sanctum/csrf-cookie"),

  login: async (data: LoginCredentials): Promise<User> => {
    await authService.getCsrf();

    const response = await apiClient.post<User>("/login", data);
    return response.data;
  },

  logout: (): Promise<void> => apiClient.post("/logout"),

  me: async (): Promise<User> => {
    const response = await apiClient.get<User>("/me");
    return response.data;
  },
};
