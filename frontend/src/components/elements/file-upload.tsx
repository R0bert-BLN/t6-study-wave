import React, { type JSX } from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Attachment } from "@/types/resources/attachment";

interface FileUploadProps {
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
}: FileUploadProps): JSX.Element {
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
      <label className="group mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 p-8 text-zinc-400 transition-colors hover:border-blue-300 hover:bg-zinc-50">
        <Upload className="mb-2 text-3xl text-zinc-300 transition-colors group-hover:text-blue-500" />
        <input type="file" onChange={handleFileChange} className="hidden" multiple />
      </label>

      <div className="no-scrollbar max-h-[100px] space-y-2 overflow-y-auto">
        {existingAttachments.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-3 rounded-lg bg-zinc-50 p-2 text-[12px]"
          >
            <FileText size={16} />
            <span className="flex-1 truncate">{file.name}</span>

            <button
              type="button"
              onClick={() => onRemoveExisting?.(file.id)}
              className="cursor-pointer text-rose-500 hover:text-rose-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {selectedFiles.map((file, idx) => (
          <div key={idx} className="flex items-center gap-3 rounded-lg bg-zinc-50 p-2 text-[12px]">
            <FileText size={16} />
            <span className="flex-1 truncate">{file.name}</span>

            <button
              type="button"
              onClick={() => removeNewFile(idx)}
              className="cursor-pointer text-rose-500 hover:text-rose-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
