import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { announcementService } from "@/servicies/resources/announcement.ts";
import type { Announcement } from "@/types/resources/announcement.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAnnouncements = (params: QueryParams): BaseQueryResult<Announcement> => {
  return useBaseQuery<Announcement>({
    queryKey: [ResourceType.Announcement],
    queryFn: (queryParams) => announcementService.getAll(queryParams),
    params,
  });
};

export const useGetAnnouncementById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Announcement, id],
    queryFn: () => announcementService.getById(id),
    enabled: !!id,
  });
};
