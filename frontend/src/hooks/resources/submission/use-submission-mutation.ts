import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Submission } from "@/types/resources/submission.ts";
import {
  submissionService,
  type SubmissionCreatePayload,
} from "@/servicies/resources/submission.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmissionCreatePayload): Promise<Submission> =>
      submissionService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Submission] });
    },
  });
};

export const useUpdateSubmission = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Submission>): Promise<Submission> =>
      submissionService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Submission] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Submission, id] });
    },
  });
};
