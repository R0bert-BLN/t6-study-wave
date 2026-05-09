import type { JSX } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

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

        {/* Start Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold tracking-widest text-zinc-400">Start Date</label>

          <div className="relative">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              className={cn(
                "flex h-10 w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/30 pl-4 pr-10 text-sm text-zinc-900 transition-colors focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:outline-none",
                "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              )}
            />

            <Calendar
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-900"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold tracking-widest text-zinc-400">End Date</label>

          <div className="relative">
            <input
              type="date"
              value={filters.endDate}
              min={filters.startDate}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              className={cn(
                "flex h-10 w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/30 pl-4 pr-10 text-sm text-zinc-900 transition-colors focus-visible:border-blue-600 focus-visible:ring-0 focus-visible:outline-none",
                "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              )}
            />

            <Calendar
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}