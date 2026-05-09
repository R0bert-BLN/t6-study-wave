import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { commentService } from "@/servicies/resources/comment.ts";
import type { Comment } from "@/types/resources/comment.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllComments = (params: QueryParams): BaseQueryResult<Comment> => {
  return useBaseQuery<Comment>({
    queryKey: [ResourceType.Comment],
    queryFn: (queryParams) => commentService.getAll(queryParams),
    params,
  });
};

export const useGetCommentById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Comment, id],
    queryFn: () => commentService.getById(id),
    enabled: !!id,
  });
};
