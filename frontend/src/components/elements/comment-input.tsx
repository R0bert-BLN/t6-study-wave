import type { JSX } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { SendHorizontal } from "lucide-react";

interface CommentInputProps {
  variant?: "default" | "private";
  placeholder?: string;
  onSubmit: (value: string) => void;
  userLabel?: string;
  userSrc?: string | null;
  className?: string;
}

export function CommentInput({
  variant = "default",
  placeholder,
  onSubmit,
  userLabel = "U",
  userSrc,
  className,
}: CommentInputProps): JSX.Element {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    }
  };

  const isDefault = variant === "default";

  return (
    <div className={cn("flex w-full items-center gap-4", className)}>
      {isDefault && (
        <UserAvatar label={userLabel} src={userSrc} className="h-9 w-9 border-none shadow-none" />
      )}

      <div className="relative flex flex-1 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className={cn(
            "w-full text-[14px] transition-all outline-none",
            isDefault
              ? "border-b border-zinc-200 bg-transparent py-2 pr-10 focus:border-zinc-900"
              : "rounded-full border border-zinc-100 bg-zinc-50 py-2.5 pr-12 pl-5 shadow-sm focus:border-zinc-200 focus:bg-white",
          )}
        />

        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className={cn(
            "absolute top-1/2 right-0 flex -translate-y-1/2 cursor-pointer items-center justify-center transition-all outline-none",
            "disabled:cursor-default disabled:opacity-50 disabled:shadow-none",
            isDefault
              ? "pr-1 text-zinc-400 enabled:hover:text-zinc-900"
              : "right-1.5 h-8 w-8 rounded-full bg-zinc-950 text-white enabled:shadow-md enabled:hover:bg-black",
          )}
        >
          <SendHorizontal size={isDefault ? 22 : 18} className="transition-transform" />
        </button>
      </div>
    </div>
  );
}
