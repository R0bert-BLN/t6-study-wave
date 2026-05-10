import React, { type JSX } from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Attachment } from "@/types/resources/attachment";
import { useFileHandler } from "@/hooks/general/use-file-handler.ts";

interface FileUploadProps {
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  existingAttachments?: Attachment[];
  onRemoveExisting?: (id: string) => void;
  className?: string;
}

export default function FileUpload({
  onFilesSelected,
  selectedFiles,
  existingAttachments = [],
  onRemoveExisting,
  className,
  disabled = false,
}: FileUploadProps): JSX.Element {
  const { previewFile } = useFileHandler();

  const openLocalPreview = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const previewWindow = window.open(objectUrl, "_blank");

    if (!previewWindow) {
      URL.revokeObjectURL(objectUrl);
      return;
    }

    previewWindow.addEventListener("load", () => {
      URL.revokeObjectURL(objectUrl);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFilesSelected([...selectedFiles, ...newFiles]);
    }
  };

  const removeNewFile = (index: number) => {
    onFilesSelected(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <label
        className={cn(
          "group mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 p-8 text-zinc-400 transition-colors hover:border-blue-300 hover:bg-zinc-50",
          { "cursor-default, hover:border-zinc-200": disabled },
        )}
      >
        <Upload
          className={cn("mb-2 text-3xl text-zinc-300 transition-colors group-hover:text-blue-500", {
            "opacity-50 group-hover:text-zinc-300": disabled,
          })}
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          multiple
          disabled={disabled}
        />
      </label>

      <div className="no-scrollbar max-h-[100px] space-y-2 overflow-y-auto">
        {existingAttachments.map((file: Attachment) => (
          <div
            key={file.id}
            className="flex items-center gap-3 rounded-lg bg-zinc-50 p-2 text-[12px]"
          >
            <FileText size={16} />
            <span
              onClick={() => previewFile(file.path)}
              className="flex-1 cursor-pointer truncate hover:opacity-70"
            >
              {file.name}
            </span>

            <button
              type="button"
              onClick={() => onRemoveExisting?.(file.id)}
              className={cn(
                "cursor-pointer text-rose-500 hover:text-rose-700",
                { hidden: !onRemoveExisting },
                { "cursor-default hover:text-rose-300": disabled },
              )}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {selectedFiles.map((file, idx) => (
          <div key={idx} className="flex items-center gap-3 rounded-lg bg-zinc-50 p-2 text-[12px]">
            <FileText size={16} />
            <span
              onClick={() => openLocalPreview(file)}
              className="flex-1 cursor-pointer truncate hover:opacity-70"
            >
              {file.name}
            </span>

            <button
              type="button"
              onClick={() => removeNewFile(idx)}
              className={cn("cursor-pointer text-rose-500 hover:text-rose-700", {
                "cursor-default hover:text-rose-300": disabled,
              })}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
