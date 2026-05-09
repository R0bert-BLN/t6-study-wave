import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { submissionService } from "@/servicies/resources/submission.ts";
import type { Submission } from "@/types/resources/submission.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSubmissions = (params: QueryParams): BaseQueryResult<Submission> => {
  return useBaseQuery<Submission>({
    queryKey: [ResourceType.Submission],
    queryFn: (queryParams) => submissionService.getAll(queryParams),
    params,
  });
};

export const useGetSubmissionById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Submission, id],
    queryFn: () => submissionService.getById(id),
    enabled: !!id,
  });
};
