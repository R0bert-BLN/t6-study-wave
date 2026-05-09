import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Announcement, AnnouncementPayload } from "@/types/resources/announcement.ts";
import { announcementService } from "@/servicies/resources/announcement.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateAnnouncement = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AnnouncementPayload): Promise<Announcement> =>
      announcementService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Announcement] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Flux, courseId] });
    },
  });
};

export const useUpdateAnnouncement = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Announcement>): Promise<Announcement> =>
      announcementService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Announcement] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Announcement, id] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Flux, courseId] });
    },
  });
};
