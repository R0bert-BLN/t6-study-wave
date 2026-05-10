import type { ApiQueryParams } from "@/utils/query-builder.ts";
import type { ApiResponse, LaravelPaginator } from "@/types/general/api.ts";
import type { User, UserPayload } from "@/types/resources/user.ts";
import apiClient from "@/lib/axios.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { mapPaginator } from "@/utils/pagination.ts";

const buildUserFormData = (data: UserPayload): FormData => {
  const formData = new FormData();

  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);

  if (data.picture) {
    formData.append("picture", data.picture);
  }

  return formData;
};

export const userService = {
  getAll: async (params: ApiQueryParams): Promise<ApiResponse<User[]>> => {
    const response = await apiClient.get<ApiResponse<LaravelPaginator<User>>>(
      `/${ResourceType.User}`,
      { params },
    );
    return mapPaginator(response.data.data);
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/${ResourceType.User}/${id}`);
    return response.data.data as User;
  },

  update: async (id: string, data: UserPayload): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(
      `/${ResourceType.User}/${id}`,
      buildUserFormData(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data.data as User;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/${ResourceType.User}/${id}`);
  },
};
