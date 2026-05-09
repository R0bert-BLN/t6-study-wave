import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { userService } from "@/servicies/resources/user.ts";
import type { User } from "@/types/resources/user.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = (params: QueryParams): BaseQueryResult<User> => {
  return useBaseQuery<User>({
    queryKey: [ResourceType.User],
    queryFn: (queryParams) => userService.getAll(queryParams),
    params,
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.User, id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
};
