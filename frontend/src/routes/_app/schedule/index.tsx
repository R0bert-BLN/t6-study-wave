import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import Header from "@/components/elements/header.tsx";
import { useModal } from "@/providers/modal/use-modal.ts";
import { ReminderForm } from "@/features/schedule/create/schedule-form.tsx";
import { useGetAllReminders } from "@/hooks/resources/reminder/use-reminder-query.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";
import ReminderGrid from "@/features/schedule/list/reminder-grid.tsx";

export const Route = createFileRoute("/_app/schedule/")({
  component: SchedulePage,
});

function SchedulePage(): JSX.Element {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { data: reminders, filters } = useGetAllReminders({
    filters: { created_by: user?.id ?? "" },
  });

  return (
    <div className="main-container flex h-screen flex-col">
      <Header
        className="pb-10"
        title={"Schedule"}
        subtitle="View and manage your schedule"
        buttonText="Create Reminder"
        onButtonClick={() => openModal(<ReminderForm />, "!max-w-xl")}
      />

      <ReminderGrid reminders={reminders ?? []} setFilter={filters.setFilter} />
    </div>
  );
}
