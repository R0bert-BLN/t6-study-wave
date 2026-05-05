import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Note } from "@/types/resources/note.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

export interface NoteCreatePayload {
  title: string;
  body: string;
  createdBy: string;
  category?: string | null;
}

export const noteService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Note[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Note>>>(
      `/${ResourceType.Note}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Note> => {
    const response = await apiClient.get<ApiResponse<Note>>(`/${ResourceType.Note}/${id}`);
    return response.data.data as Note;
  },

  create: async (data: NoteCreatePayload): Promise<Note> => {
    const response = await apiClient.post<ApiResponse<Note>>(`/${ResourceType.Note}`, data);
    return response.data.data as Note;
  },

  update: async (id: string, data: Partial<Note>): Promise<Note> => {
    const response = await apiClient.patch<ApiResponse<Note>>(`/${ResourceType.Note}/${id}`, data);
    return response.data.data as Note;
  },
};
