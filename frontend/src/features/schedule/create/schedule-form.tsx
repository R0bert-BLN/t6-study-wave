import { type JSX } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { InputField } from "@/components/elements/input-field";
import SubmitButton from "@/components/elements/submit-button";
import { useModal } from "@/providers/modal/use-modal";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { Button } from "@/components/ui/button.tsx";
import { TextField } from "@/components/elements/text-field.tsx";
import { FormProvider } from "@/providers/form/form-provider.tsx";
import DateTimeField from "@/components/elements/date-time-field.tsx";
import { formatForDatetimeLocal, formatIsoForLaravel } from "@/utils/date.ts";
import type { Reminder } from "@/types/resources/reminder.ts";
import {
  useCreateReminder,
  useUpdateReminder,
} from "@/hooks/resources/reminder/use-reminder-mutation.ts";

const reminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  scheduledAt: z.string().min(1, "Schedule date is required"),
});

interface ResourceFormProps {
  reminder?: Reminder;
}

export function ReminderForm({ reminder }: ResourceFormProps): JSX.Element {
  const { closeModal } = useModal();
  const { user } = useAuth();

  const { mutate: createReminder, isPending: isCreating } = useCreateReminder();
  const { mutate: updateReminder, isPending: isUpdating } = useUpdateReminder(reminder?.id ?? "");

  const form = useForm({
    defaultValues: {
      title: reminder?.title ?? "",
      description: reminder?.description ?? "",
      scheduledAt: reminder ? formatForDatetimeLocal(reminder?.scheduledAt) : "",
    },
    validators: {
      onSubmit: reminderSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        scheduledAt: formatIsoForLaravel(value.scheduledAt),
        createdBy: user?.id ?? "",
      };

      if (reminder) {
        updateReminder(payload, {
          onSuccess: () => {
            toast.success("Reminder updated successfully");
            closeModal();
          },
          onError: () => {
            toast.error("Failed to update reminder");
          },
        });
      } else {
        createReminder(payload, {
          onSuccess: () => {
            toast.success("Reminder created successfully");
            closeModal();
          },
          onError: () => {
            toast.error("Failed to create reminder");
          },
        });
      }
    },
  });

  return (
    <FormProvider value={form}>
      <div className="flex h-full flex-col gap-6">
        <p className="text-xl font-bold text-zinc-900">
          {reminder ? "Edit Reminder" : "Add Reminder"}
        </p>

        <form
          className="flex flex-col gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <InputField name="title" label="Title" />
          <TextField name="description" label="Description" />
          <DateTimeField name="scheduledAt" label="Scheduled At" />

          <div className="mt-2 flex justify-end gap-3 pt-6">
            <Button
              type="button"
              onClick={closeModal}
              variant="outline"
              className="cursor-pointer px-4 py-4.5 text-[13px] font-medium transition-all"
            >
              Cancel
            </Button>

            <SubmitButton
              isLoading={isCreating || isUpdating}
              label={reminder ? "Update" : "Create"}
              className="main-btn px-4"
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
