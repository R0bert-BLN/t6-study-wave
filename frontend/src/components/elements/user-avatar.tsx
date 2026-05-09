import type { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  label: string;
  src?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export function UserAvatar({
  label,
  src,
  className,
  fallbackClassName,
}: UserAvatarProps): JSX.Element {
  return (
    <Avatar className={cn("h-10 w-10 border border-zinc-200 shadow-sm", className)}>
      {src && <AvatarImage src={src} alt={label} className="object-cover" />}

      <AvatarFallback
        className={cn(
          "flex items-center justify-center bg-zinc-950 text-[13px] font-bold tracking-tight text-white",
          fallbackClassName,
        )}
      >
        {label.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
