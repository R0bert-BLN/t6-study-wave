import type { JSX } from "react";
import type { Note } from "@/types/resources/note.ts";
import { cn } from "@/lib/utils.ts";
import { useModal } from "@/providers/modal/use-modal.ts";
import NoteForm from "@/features/notes/create/note-form.tsx";

export interface NoteCardProps {
  note: Note;
  className?: string;
}

export default function NoteCard({ note, className }: NoteCardProps): JSX.Element {
  const { openModal } = useModal();

  return (
    <div
      onClick={() => openModal(<NoteForm note={note} />, "!max-w-xl")}
      className={cn(
        "group flex flex-col justify-between rounded-2xl border p-4",
        "cursor-pointer border-amber-200/60 bg-[#FFFCF6] shadow-sm hover:opacity-70",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="line-clamp-1 text-base font-semibold text-amber-950">{note.title}</span>

          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>

        <span className="line-clamp-3 text-sm leading-relaxed text-amber-900/70">{note.body}</span>
      </div>
    </div>
  );
}
