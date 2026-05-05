import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { assignmentService } from "@/servicies/resources/assignment.ts";
import type { Assignment } from "@/types/resources/assignment.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAssignments = (params: QueryParams): BaseQueryResult<Assignment> => {
  return useBaseQuery<Assignment>({
    queryKey: [ResourceType.Assignment],
    queryFn: (queryParams) => assignmentService.getAll(queryParams),
    params,
  });
};

export const useGetAssignmentById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Assignment, id],
    queryFn: () => assignmentService.getById(id),
    enabled: !!id,
  });
};
