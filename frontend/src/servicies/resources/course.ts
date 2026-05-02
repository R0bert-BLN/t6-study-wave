import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Course } from "@/types/resources/course.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

export const courseService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Course[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Course>>>(
      `/${ResourceType.Course}`,
      { params },
    );
    const paginator = response.data.data;

    return mapPaginator(paginator);
  },

  getById: async (id: string): Promise<Course> => {
    const response = await apiClient.get<ApiResponse<Course>>(`/${ResourceType.Course}/${id}`);
    return response.data.data as Course;
  },

  create: async (data: Partial<Course>): Promise<Course> => {
    const response = await apiClient.post<ApiResponse<Course>>(`/${ResourceType.Course}`, data);
    return response.data.data as Course;
  },

  update: async (id: string, data: Partial<Course>): Promise<Course> => {
    const response = await apiClient.patch<ApiResponse<Course>>(
      `/${ResourceType.Course}/${id}`,
      data,
    );
    return response.data.data as Course;
  },
};
