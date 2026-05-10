import type { Attachment } from "@/types/resources/attachment.ts";
import { JSX } from "react";
import { useFileHandler } from "@/hooks/general/use-file-handler.ts";
import { cn } from "@/lib/utils.ts";
import { ExternalLink, File } from "lucide-react";

interface AttachmentCardProps {
  attachment: Attachment;
  className?: string;
}

export default function AttachmentCard({
  attachment,
  className,
}: AttachmentCardProps): JSX.Element {
  const { previewFile } = useFileHandler();

  return (
    <div
      onClick={() => previewFile(attachment.path)}
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-[14px] border border-zinc-200 bg-white p-3 transition-all duration-200",
        "hover:opacity-70",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
            "bg-blue-50 text-blue-500",
          )}
        >
          <File size={20} strokeWidth={2.5} />
        </div>

        <div className="flex flex-col gap-1 overflow-hidden">
          <span className="truncate text-[13px] leading-tight font-bold text-zinc-900">
            {attachment.name}
          </span>

          <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
            {attachment.extension} {attachment.size ? `• ${attachment.size} MB` : ""}
          </span>
        </div>
      </div>

      <div className="px-2 text-zinc-300 transition-colors group-hover:text-zinc-500">
        <ExternalLink size={16} />
      </div>
    </div>
  );
}
