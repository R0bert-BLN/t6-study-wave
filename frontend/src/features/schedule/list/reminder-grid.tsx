import { ReminderCard } from "@/components/elements/reminder-card.tsx";
import { type JSX, useEffect, useState } from "react";
import type { Reminder } from "@/types/resources/reminder.ts";
import NotFound from "@/components/elements/not-found.tsx";
import {
  type ScheduleFilterState,
  ScheduleFilter,
} from "@/components/elements/schedule-filter.tsx";
import type { FilterState, FilterValue } from "@/utils/query-builder.ts";

interface ReminderGridProps {
  reminders: Reminder[];
  setFilter: (key: keyof FilterState, value: FilterValue) => void;
}

export default function ReminderGrid({ reminders, setFilter }: ReminderGridProps): JSX.Element {
  const [filters, setFilters] = useState<ScheduleFilterState>({
    isToday: true,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setFilter("scheduled_after", filters.startDate);
    setFilter("scheduled_before", filters.endDate);
    setFilter("today", filters.isToday);
  }, [filters]);

  if (reminders.length === 0) {
    return <NotFound message={"No reminders found"} />;
  }

  return (
    <div className="flex min-h-0 flex-1 justify-between gap-20">
      <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto">
        {reminders.map((reminder) => (
          <ReminderCard key={reminder.id} reminder={reminder} />
        ))}
      </div>

      <div className="w-[250px] shrink-0">
        <ScheduleFilter filters={filters} onChange={setFilters} />
      </div>
    </div>
  );
}
