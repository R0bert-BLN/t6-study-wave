import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Reminder, ReminderPayload } from "@/types/resources/reminder.ts";
import { reminderService } from "@/servicies/resources/reminder.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReminderPayload): Promise<Reminder> => reminderService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Reminder] });
    },
  });
};

export const useUpdateReminder = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReminderPayload): Promise<Reminder> => reminderService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Reminder] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Reminder, id] });
    },
  });
};

export const useDeleteReminder = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<void> => reminderService.delete(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Reminder] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Reminder, id] });
    },
  });
};
