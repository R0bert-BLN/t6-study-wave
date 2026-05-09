import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Assignment, AssignmentPayload } from "@/types/resources/assignment.ts";
import { assignmentService } from "@/servicies/resources/assignment.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateAssignment = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignmentPayload): Promise<Assignment> => assignmentService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Assignment] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Classwork, courseId] });
    },
  });
};

export const useUpdateAssignment = (id: string, courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignmentPayload): Promise<Assignment> =>
      assignmentService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Assignment] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Assignment, id] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Classwork, courseId] });
    },
  });
};

export const useDeleteAssignment = (id: string, courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<void> => assignmentService.delete(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Assignment] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Assignment, id] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Classwork, courseId] });
    },
  });
};
