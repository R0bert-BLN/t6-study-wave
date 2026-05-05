import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Material, MaterialPayload } from "@/types/resources/material.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

const buildMaterialFormData = (data: MaterialPayload): FormData => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("created_by", data.createdBy);
  formData.append("course_id", data.courseId);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.category) {
    formData.append("category", data.category);
  }

  data.attachments?.forEach((file) => {
    formData.append("attachments[]", file);
  });

  data.deletedAttachments?.forEach((id) => {
    formData.append("deleted_attachments[]", id);
  });

  return formData;
};

export const materialService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Material[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Material>>>(
      `/${ResourceType.Material}`,
      { params },
    );

    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Material> => {
    const response = await apiClient.get<ApiResponse<Material>>(`/${ResourceType.Material}/${id}`);

    return response.data.data as Material;
  },

  create: async (data: MaterialPayload): Promise<Material> => {
    const response = await apiClient.post<ApiResponse<Material>>(
      `/${ResourceType.Material}`,
      buildMaterialFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data as Material;
  },

  update: async (id: string, data: MaterialPayload): Promise<Material> => {
    const response = await apiClient.patch<ApiResponse<Material>>(
      `/${ResourceType.Material}/${id}`,
      buildMaterialFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data as Material;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/${ResourceType.Material}/${id}`);
  },
};
