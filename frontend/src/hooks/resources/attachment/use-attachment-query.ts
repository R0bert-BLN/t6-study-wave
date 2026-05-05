import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { attachmentService } from "@/servicies/resources/attachment.ts";
import type { Attachment } from "@/types/resources/attachment.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAttachments = (params: QueryParams): BaseQueryResult<Attachment> => {
  return useBaseQuery<Attachment>({
    queryKey: [ResourceType.Attachment],
    queryFn: (queryParams) => attachmentService.getAll(queryParams),
    params,
  });
};

export const useGetAttachmentById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Attachment, id],
    queryFn: () => attachmentService.getById(id),
    enabled: !!id,
  });
};
