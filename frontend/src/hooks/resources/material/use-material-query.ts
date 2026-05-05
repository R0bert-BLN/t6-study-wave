import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { materialService } from "@/servicies/resources/material.ts";
import type { Material } from "@/types/resources/material.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllMaterials = (params: QueryParams): BaseQueryResult<Material> => {
  return useBaseQuery<Material>({
    queryKey: [ResourceType.Material],
    queryFn: (queryParams) => materialService.getAll(queryParams),
    params,
  });
};

export const useGetMaterialById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Material, id],
    queryFn: () => materialService.getById(id),
    enabled: !!id,
  });
};
