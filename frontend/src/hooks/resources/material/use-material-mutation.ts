import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Material, MaterialPayload } from "@/types/resources/material.ts";
import { materialService } from "@/servicies/resources/material.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateMaterial = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MaterialPayload): Promise<Material> => materialService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Material] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Classwork, courseId] });
    },
  });
};

export const useUpdateMaterial = (id: string, courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MaterialPayload): Promise<Material> => materialService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Material] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Material, id] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Classwork, courseId] });
    },
  });
};

export const useDeleteMaterial = (id: string, courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<void> => materialService.delete(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Material] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Material, id] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Classwork, courseId] });
    },
  });
};
