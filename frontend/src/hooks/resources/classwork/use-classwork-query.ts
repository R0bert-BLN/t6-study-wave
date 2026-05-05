import { classworkService } from "@/servicies/resources/classwork.ts";
import type { Classwork } from "@/types/resources/classwork.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetClasswork = (courseId: string) => {
  return useQuery<Classwork>({
    queryKey: [ResourceType.Classwork, courseId],
    queryFn: async () => {
      const response = await classworkService.getAll(courseId);
      return response.data ?? {};
    },
    placeholderData: keepPreviousData,
  });
};
