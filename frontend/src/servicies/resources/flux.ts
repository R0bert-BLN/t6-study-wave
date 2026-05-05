import type { ApiResponse } from "@/types/general/api.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import type { FluxItem } from "@/types/resources/flux.ts";

export const fluxService = {
  getAll: async (courseId: string): Promise<ApiResponse<FluxItem[]>> => {
    const response = await apiClient.get<ApiResponse<FluxItem[]>>(
      `/${ResourceType.Course}/${courseId}/${ResourceType.Flux}`,
    );

    return response.data.data;
  },
};
