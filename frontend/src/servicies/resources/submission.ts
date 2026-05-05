import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { Submission } from "@/types/resources/submission.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

export interface SubmissionCreatePayload {
  assignmentId: string;
  attachments?: File[];
}

const buildSubmissionFormData = (data: SubmissionCreatePayload): FormData => {
  const formData = new FormData();
  formData.append("assignment_id", data.assignmentId);
  data.attachments?.forEach((file) => {
    formData.append("attachments[]", file);
  });
  return formData;
};

export const submissionService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<Submission[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<Submission>>>(
      `/${ResourceType.Submission}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<Submission> => {
    const response = await apiClient.get<ApiResponse<Submission>>(
      `/${ResourceType.Submission}/${id}`,
    );
    return response.data.data as Submission;
  },

  create: async (data: SubmissionCreatePayload): Promise<Submission> => {
    const response = await apiClient.post<ApiResponse<Submission>>(
      `/${ResourceType.Submission}`,
      buildSubmissionFormData(data),
    );
    return response.data.data as Submission;
  },

  update: async (id: string, data: Partial<Submission>): Promise<Submission> => {
    const response = await apiClient.patch<ApiResponse<Submission>>(
      `/${ResourceType.Submission}/${id}`,
      data,
    );
    return response.data.data as Submission;
  },
};
