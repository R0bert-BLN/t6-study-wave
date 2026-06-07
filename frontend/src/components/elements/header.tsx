import SearchBar from "@/components/elements/search-bar.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { JSX } from "react";
import { cn } from "@/lib/utils.ts";
import JoinForm from "@/features/courses/create/join-form.tsx";
import { useAuth } from "@/providers/auth/use-auth.ts";
import { useModal } from "@/providers/modal/use-modal.ts";
import { useLocation } from "@tanstack/react-router";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  onSearch?: (value: string) => void;
  buttonText?: string;
  onButtonClick?: () => void;
  titleClassName?: string;
}

export default function Header({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  onSearch,
  className,
  titleClassName,
}: HeaderProps): JSX.Element {
  const { isProfessor } = useAuth();
  const { openModal } = useModal();
  const location = useLocation();
  const isCoursesTab = location.pathname === "/courses";

  return (
    <div className={cn("flex w-full items-center justify-between", className)}>
      <div className="w-full">
        <p className={cn("text-3xl font-bold tracking-tight text-zinc-900", titleClassName)}>
          {title}
        </p>
        <p className="mt-2 text-zinc-500">{subtitle}</p>
      </div>

      <div className="flex w-full items-center justify-end gap-4">
        {onSearch && <SearchBar className="w-60" onSearch={onSearch} />}
        {buttonText && onButtonClick && (
          <div className={"flex items-center gap-2"}>
            <Button className="main-btn px-5" onClick={onButtonClick}>
              {buttonText}
            </Button>

            {isProfessor && isCoursesTab && (
              <Button className="main-btn" onClick={() => openModal(<JoinForm />, "!max-w-xl")}>
                Join Course
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
