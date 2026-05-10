import type { JSX } from "react";
import { Link } from "@tanstack/react-router";
import { UserAvatar } from "./user-avatar";
import { cn } from "@/lib/utils";

interface CommentItemProps {
  variant?: "announcement" | "comment";
  authorName: string;
  authorInitials: string;
  authorAvatar?: string | null;
  content: string;
  createdAt?: string;
  href?: string;
  className?: string;
}

export default function CommentItem({
  variant = "comment",
  authorName,
  authorInitials,
  authorAvatar,
  content,
  createdAt,
  href,
  className,
}: CommentItemProps): JSX.Element {
  const isAnnouncement = variant === "announcement";
  const Wrapper = isAnnouncement && href ? Link : "div";
  const wrapperProps = isAnnouncement && href ? { to: href } : {};

  return (
    <div
      className={cn(
        "group flex w-full gap-4",
        isAnnouncement ? "cursor-pointer hover:opacity-70" : "",
        className,
      )}
    >
      <div className="shrink-0">
        <UserAvatar
          label={authorInitials}
          src={authorAvatar}
          className="h-9 w-9 border-none shadow-none"
        />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-baseline gap-2">
            <p className="truncate text-[14px] font-bold text-zinc-900">{authorName}</p>

            {createdAt && (
              <span className="text-[11px] font-medium text-zinc-400">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <Wrapper
          {...wrapperProps}
          className={cn(
            "block text-[14px] leading-relaxed break-words",
            isAnnouncement
              ? "text-zinc-800"
              : "rounded-2xl rounded-tl-sm border border-zinc-100 bg-zinc-50 p-4 text-zinc-600",
          )}
        >
          {content}
        </Wrapper>
      </div>
    </div>
  );
}
