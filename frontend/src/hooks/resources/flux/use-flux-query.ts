import { ResourceType } from "@/types/resources/resource-type.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Flux } from "@/types/resources/flux.ts";
import { fluxService } from "@/servicies/resources/flux.ts";

export const useGetFlux = (courseId: string) => {
  return useQuery<Flux>({
    queryKey: [ResourceType.Flux, courseId],
    queryFn: () => fluxService.getAll(courseId),
    placeholderData: keepPreviousData,
  });
};
