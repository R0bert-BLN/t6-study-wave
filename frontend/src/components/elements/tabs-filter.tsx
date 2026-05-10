import type { JSX } from "react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  title: string;
  onChange: () => void;
}

interface TabFiltersProps {
  items: FilterOption[];
  activeId: string;
  className?: string;
}

export default function TabFilters({ items, activeId, className }: TabFiltersProps): JSX.Element {
  return (
    <div className={cn("flex items-center gap-8 border-b border-zinc-200", className)}>
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={item.onChange}
            className={cn(
              "relative -mb-[1px] cursor-pointer border-b-2 pb-4 text-[14px] transition-colors duration-200",
              isActive
                ? "border-zinc-900 font-bold text-zinc-900"
                : "border-transparent font-medium text-zinc-500 hover:border-zinc-300 hover:text-zinc-700",
            )}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
}
