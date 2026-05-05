import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Assignment, AssignmentPayload } from "@/types/resources/assignment.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

const buildAssignmentFormData = (data: AssignmentPayload): FormData => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("course_id", data.courseId);
  formData.append("created_by", data.createdBy);
  formData.append("category", data.category);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.dueDate) {
    formData.append("due_date", data.dueDate);
  }

  data.attachments?.forEach((file) => {
    formData.append("attachments[]", file);
  });

  data.deletedAttachments?.forEach((id) => {
    formData.append("deleted_attachments[]", id);
  });

  return formData;
};

export const assignmentService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Assignment[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Assignment>>>(
      `/${ResourceType.Assignment}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Assignment> => {
    const response = await apiClient.get<ApiResponse<Assignment>>(
      `/${ResourceType.Assignment}/${id}`,
    );
    return response.data.data as Assignment;
  },

  create: async (data: AssignmentPayload): Promise<Assignment> => {
    const response = await apiClient.post<ApiResponse<Assignment>>(
      `/${ResourceType.Assignment}`,
      buildAssignmentFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data as Assignment;
  },

  update: async (id: string, data: AssignmentPayload): Promise<Assignment> => {
    const response = await apiClient.patch<ApiResponse<Assignment>>(
      `/${ResourceType.Assignment}/${id}`,
      buildAssignmentFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data as Assignment;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/${ResourceType.Assignment}/${id}`);
  },
};
