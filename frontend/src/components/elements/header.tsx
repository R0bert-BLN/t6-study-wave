import SearchBar from "@/components/elements/search-bar.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { JSX } from "react";
import { cn } from "@/lib/utils.ts";

interface HeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  onSearch?: (value: string) => void;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Header({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  onSearch,
  className,
}: HeaderProps): JSX.Element {
  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <div className="w-full">
        <p className="text-3xl font-bold tracking-tight text-zinc-900">{title}</p>
        <p className="mt-2 text-zinc-500">{subtitle}</p>
      </div>

      <div className="flex w-full items-center justify-end gap-4">
        {onSearch && <SearchBar className="w-60" onSearch={onSearch} />}
        {buttonText && onButtonClick && (
          <Button className="main-btn px-5" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
