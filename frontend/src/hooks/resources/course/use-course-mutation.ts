import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Course } from "@/types/resources/course.ts";
import { courseService } from "@/servicies/resources/course.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Course>): Promise<Course> => courseService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Course] });
    },
  });
};

export const useUpdateCourse = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Course>): Promise<Course> => courseService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Course] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Course, id] });
    },
  });
};
