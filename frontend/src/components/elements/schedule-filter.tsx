import type { JSX } from "react";
import { cn } from "@/lib/utils";

export interface ScheduleFilterState {
  isToday: boolean;
  startDate: string;
  endDate: string;
}

interface ScheduleFilterProps {
  filters: ScheduleFilterState;
  onChange: (newFilters: ScheduleFilterState) => void;
  className?: string;
}

export function ScheduleFilter({ filters, onChange, className }: ScheduleFilterProps): JSX.Element {
  const handleToggleToday = () => {
    onChange({ isToday: true, startDate: "", endDate: "" });
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    onChange({
      ...filters,
      isToday: false,
      [field]: value,
    });
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-col gap-5">
        <button
          type="button"
          onClick={handleToggleToday}
          className={cn(
            "w-full cursor-pointer rounded-md px-4 py-2 text-sm font-bold transition-all duration-200",
            filters.isToday
              ? "bg-blue-500 text-white shadow-md shadow-blue-600/20"
              : "bg-zinc-200 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900",
          )}
        >
          Today
        </button>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold tracking-widest text-zinc-400">Start Date</label>

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleDateChange("startDate", e.target.value)}
            className="flex h-10 w-full cursor-pointer rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 transition-colors focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold tracking-widest text-zinc-400">End Date</label>

          <input
            type="date"
            value={filters.endDate}
            min={filters.startDate}
            onChange={(e) => handleDateChange("endDate", e.target.value)}
            className="flex h-10 w-full cursor-pointer rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 transition-colors focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
