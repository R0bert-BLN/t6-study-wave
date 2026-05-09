import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { reminderService } from "@/servicies/resources/reminder.ts";
import type { Reminder } from "@/types/resources/reminder.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReminders = (params: QueryParams): BaseQueryResult<Reminder> => {
  return useBaseQuery<Reminder>({
    queryKey: [ResourceType.Reminder],
    queryFn: (queryParams) => reminderService.getAll(queryParams),
    params,
  });
};

export const useGetReminderById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Reminder, id],
    queryFn: () => reminderService.getById(id),
    enabled: !!id,
  });
};
