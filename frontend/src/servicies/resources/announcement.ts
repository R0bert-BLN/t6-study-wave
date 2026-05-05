import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Announcement, AnnouncementPayload } from "@/types/resources/announcement.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

export const announcementService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Announcement[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Announcement>>>(
      `/${ResourceType.Announcement}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Announcement> => {
    const response = await apiClient.get<ApiResponse<Announcement>>(
      `/${ResourceType.Announcement}/${id}`,
    );
    return response.data.data as Announcement;
  },

  create: async (data: AnnouncementPayload): Promise<Announcement> => {
    const response = await apiClient.post<ApiResponse<Announcement>>(
      `/${ResourceType.Announcement}`,
      data,
    );
    return response.data.data as Announcement;
  },

  update: async (id: string, data: Partial<Announcement>): Promise<Announcement> => {
    const response = await apiClient.patch<ApiResponse<Announcement>>(
      `/${ResourceType.Announcement}/${id}`,
      data,
    );
    return response.data.data as Announcement;
  },
};
