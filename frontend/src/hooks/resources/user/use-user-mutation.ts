import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UserPayload } from "@/types/resources/user.ts";
import { userService } from "@/servicies/resources/user.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  const { loginUser } = useAuth();

  return useMutation({
    mutationFn: (data: UserPayload): Promise<User> => userService.update(id, data),
    onSuccess: (data: User): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.User] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.User, id] });
      loginUser(data);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => userService.delete(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.User] });
    },
  });
};
