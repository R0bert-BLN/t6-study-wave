import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "@/types/resources/comment.ts";
import { commentService, type CommentCreatePayload } from "@/servicies/resources/comment.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentCreatePayload): Promise<Comment> => commentService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Comment] });
    },
  });
};

export const useUpdateComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Comment>): Promise<Comment> => commentService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Comment] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Comment, id] });
    },
  });
};
