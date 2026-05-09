import type { JSX } from "react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ActionMenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
  align?: "start" | "center" | "end";
  triggerClassName?: string;
}

export default function ActionMenu({
  items,
  align = "center",
  triggerClassName,
}: ActionMenuProps): JSX.Element | null {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={cn(
              "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/70 transition-all outline-none hover:bg-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-white/50",
              triggerClassName,
            )}
          >
            <EllipsisVertical size={20} className="text-xl" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={align}
          className="w-40 rounded-md border-zinc-100 shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              disabled={item.disabled}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
              }}
              className={cn(
                "cursor-pointer py-1.5 text-[13px] transition-colors",
                item.destructive
                  ? "text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                  : "text-zinc-700 focus:bg-zinc-50 focus:text-zinc-900",
              )}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
