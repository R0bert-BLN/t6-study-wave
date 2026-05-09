import type { ApiResponse } from "@/types/general/api.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import type { ClassworkItem } from "@/types/resources/classwork.ts";

export const classworkService = {
  getAll: async (courseId: string): Promise<ApiResponse<ClassworkItem[]>> => {
    const response = await apiClient.get<ApiResponse<ClassworkItem[]>>(
      `/${ResourceType.Course}/${courseId}/${ResourceType.Classwork}`,
    );

    return response.data;
  },
};
