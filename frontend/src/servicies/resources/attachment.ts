import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Attachment, AttachmentCreatePayload } from "@/types/resources/attachment.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

const buildAttachmentFormData = (data: AttachmentCreatePayload): FormData => {
  const formData = new FormData();
  formData.append("attachable_id", data.attachableId);
  formData.append("attachable_type", data.attachableType);
  formData.append("file", data.file);
  return formData;
};

export const attachmentService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Attachment[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Attachment>>>(
      `/${ResourceType.Attachment}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Attachment> => {
    const response = await apiClient.get<ApiResponse<Attachment>>(
      `/${ResourceType.Attachment}/${id}`,
    );
    return response.data.data as Attachment;
  },

  create: async (data: AttachmentCreatePayload): Promise<Attachment> => {
    const response = await apiClient.post<ApiResponse<Attachment>>(
      `/${ResourceType.Attachment}`,
      buildAttachmentFormData(data),
    );
    return response.data.data as Attachment;
  },

  update: async (id: string, data: Partial<Attachment>): Promise<Attachment> => {
    const response = await apiClient.patch<ApiResponse<Attachment>>(
      `/${ResourceType.Attachment}/${id}`,
      data,
    );
    return response.data.data as Attachment;
  },
};
