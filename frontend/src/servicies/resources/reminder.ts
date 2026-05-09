import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Reminder } from "@/types/resources/reminder.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

export interface ReminderCreatePayload {
  title: string;
  description?: string | null;
  scheduledAt: string;
  createdBy: string;
}

export const reminderService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Reminder[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Reminder>>>(
      `/${ResourceType.Reminder}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Reminder> => {
    const response = await apiClient.get<ApiResponse<Reminder>>(`/${ResourceType.Reminder}/${id}`);
    return response.data.data as Reminder;
  },

  create: async (data: ReminderCreatePayload): Promise<Reminder> => {
    const response = await apiClient.post<ApiResponse<Reminder>>(`/${ResourceType.Reminder}`, data);
    return response.data.data as Reminder;
  },

  update: async (id: string, data: Partial<Reminder>): Promise<Reminder> => {
    const response = await apiClient.patch<ApiResponse<Reminder>>(
      `/${ResourceType.Reminder}/${id}`,
      data,
    );
    return response.data.data as Reminder;
  },
};
