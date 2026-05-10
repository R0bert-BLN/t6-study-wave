import type { JSX } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOption } from "@/components/elements/tabs-filter.tsx";

interface SelectFilterProps {
  items: FilterOption[];
  activeId: string;
  className?: string;
  placeholder?: string;
}

export default function SelectFilter({
  items,
  activeId,
  className,
  placeholder = "Select option...",
}: SelectFilterProps): JSX.Element {
  const handleValueChange = (value: string) => {
    const selectedItem = items.find((item) => item.id === value);
    if (selectedItem) {
      selectedItem.onChange();
    }
  };

  return (
    <Select value={activeId} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn(
          "w-auto min-w-[140px] border-none bg-transparent px-0 shadow-none hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0",
          "text-[14px] font-medium text-zinc-600 transition-colors hover:text-zinc-900",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent align="end">
        {items.map((item) => (
          <SelectItem key={item.id} value={item.id} className="cursor-pointer">
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
