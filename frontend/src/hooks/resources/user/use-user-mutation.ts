import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/resources/user.ts";
import { userService } from "@/servicies/resources/user.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>): Promise<User> => userService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.User] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.User, id] });
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
