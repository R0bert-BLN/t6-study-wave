import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Comment, CommentPayload } from "@/types/resources/comment.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

export const commentService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Comment[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Comment>>>(
      `/${ResourceType.Comment}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Comment> => {
    const response = await apiClient.get<ApiResponse<Comment>>(`/${ResourceType.Comment}/${id}`);
    return response.data.data as Comment;
  },

  create: async (data: CommentPayload): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<Comment>>(`/${ResourceType.Comment}`, data);
    return response.data.data as Comment;
  },

  update: async (id: string, data: Partial<Comment>): Promise<Comment> => {
    const response = await apiClient.patch<ApiResponse<Comment>>(
      `/${ResourceType.Comment}/${id}`,
      data,
    );
    return response.data.data as Comment;
  },
};
