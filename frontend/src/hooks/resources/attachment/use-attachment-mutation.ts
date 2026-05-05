import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Attachment, AttachmentCreatePayload } from "@/types/resources/attachment.ts";
import { attachmentService } from "@/servicies/resources/attachment.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AttachmentCreatePayload): Promise<Attachment> =>
      attachmentService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Attachment] });
    },
  });
};

export const useUpdateAttachment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Attachment>): Promise<Attachment> =>
      attachmentService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Attachment] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Attachment, id] });
    },
  });
};
