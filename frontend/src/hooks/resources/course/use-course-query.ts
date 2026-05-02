import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { courseService } from "@/servicies/resources/course.ts";
import type { Course } from "@/types/resources/course.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCourses = (params: QueryParams): BaseQueryResult<Course> => {
  return useBaseQuery<Course>({
    queryKey: ResourceType.Course,
    queryFn: (params) => courseService.getAll(params),
    params: params,
  });
};

export const useGetCourseById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Course, id],
    queryFn: () => courseService.getById(id),
    enabled: !!id,
  });
};
