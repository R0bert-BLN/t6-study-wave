import type { JSX } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export function BackButton({ label = "Back", className }: BackButtonProps): JSX.Element {
  const router = useRouter();

  return (
    <button
      onClick={() => router.history.back()}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-md text-[14px] font-medium text-zinc-400 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none",
        className,
      )}
    >
      <ArrowLeft size={18} />
      <span>{label}</span>
    </button>
  );
}
