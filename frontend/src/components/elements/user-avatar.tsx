import type { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  label: string;
  src?: string | null;
  className?: string;
}

export function UserAvatar({ label, src, className }: UserAvatarProps): JSX.Element {
  return (
    <Avatar className={cn("h-10 w-10 border border-zinc-200 shadow-sm", className)}>
      {src && <AvatarImage src={src} alt={label} className="object-cover" />}

      <AvatarFallback className="flex items-center justify-center bg-zinc-950 text-[13px] font-bold tracking-tight text-white">
        {label.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
