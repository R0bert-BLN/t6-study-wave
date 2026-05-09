import type { JSX } from "react";
import type { Reminder } from "@/types/resources/reminder.ts";
import { cn } from "@/lib/utils";
import { formatScheduleTime } from "@/utils/date.ts";
import ActionMenu from "@/components/elements/action-menu.tsx";
import { useModal } from "@/providers/modal/use-modal.ts";
import { ReminderForm } from "@/features/schedule/create/schedule-form.tsx";
import { useDeleteReminder } from "@/hooks/resources/reminder/use-reminder-mutation.ts";
import { toast } from "sonner";

interface ReminderCardProps {
  reminder: Reminder;
  className?: string;
}

export function ReminderCard({ reminder, className }: ReminderCardProps): JSX.Element {
  const { openModal } = useModal();
  const { mutate: deleteReminder } = useDeleteReminder(reminder.id);
  const { time, ampm } = formatScheduleTime(reminder.scheduledAt);

  const items = [
    {
      label: "Edit",
      onClick: () => openModal(<ReminderForm reminder={reminder} />, "!max-w-xl"),
    },
    {
      label: "Delete",
      destructive: true,
      onClick: () =>
        deleteReminder(undefined, {
          onSuccess: () => {
            toast.success("Reminder deleted successfully");
          },
          onError: () => {
            toast.error("Failed to delete reminder");
          },
        }),
    },
  ];

  return (
    <div className={cn("flex cursor-default items-start gap-5 hover:opacity-70", className)}>
      <div className="flex min-w-[3.5rem] flex-col items-end pt-0.5">
        <span className="text-base leading-none font-bold tracking-tight text-zinc-900">
          {time}
        </span>

        <span className="mt-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
          {ampm}
        </span>
      </div>

      <div className="mt-1 h-12 w-[3px] shrink-0 rounded-full bg-blue-600 shadow-sm" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col pb-8">
          <span className="text-[15px] leading-snug font-bold text-zinc-900">{reminder.title}</span>

          {reminder.description && (
            <span className="mt-1 text-sm text-zinc-500">{reminder.description}</span>
          )}
        </div>

        <div className="pb-4">
          <ActionMenu
            items={items}
            triggerClassName="text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
