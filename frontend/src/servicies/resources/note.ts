import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse } from "@/types/general/api.ts";
import type { Note, NoteGroup, NotePayload } from "@/types/resources/note.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const noteService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<NoteGroup[]>> => {
    const response = await apiClient.get<ApiResponse<NoteGroup[]>>(`/${ResourceType.Note}`, {
      params,
    });

    return response.data;
  },

  getById: async (id: string): Promise<Note> => {
    const response = await apiClient.get<ApiResponse<Note>>(`/${ResourceType.Note}/${id}`);
    return response.data.data as Note;
  },

  create: async (data: NotePayload): Promise<Note> => {
    const response = await apiClient.post<ApiResponse<Note>>(`/${ResourceType.Note}`, data);
    return response.data.data as Note;
  },

  update: async (id: string, data: Partial<NotePayload>): Promise<Note> => {
    const response = await apiClient.patch<ApiResponse<Note>>(`/${ResourceType.Note}/${id}`, data);
    return response.data.data as Note;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/${ResourceType.Note}/${id}`);
  },
};
