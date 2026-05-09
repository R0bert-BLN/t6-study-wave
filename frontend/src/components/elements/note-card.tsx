import type { JSX } from "react";
import type { Note } from "@/types/resources/note.ts";
import { cn } from "@/lib/utils.ts";
import { useModal } from "@/providers/modal/use-modal.ts";
import NoteForm from "@/features/notes/create/note-form.tsx";
import ActionMenu from "@/components/elements/action-menu.tsx";
import {useDeleteNote} from "@/hooks/resources/note/use-note-mutation.ts";
import {toast} from "sonner";

export interface NoteCardProps {
  note: Note;
  className?: string;
}

export default function NoteCard({ note, className }: NoteCardProps): JSX.Element {
  const { openModal } = useModal();
  const { mutate: deleteNote } = useDeleteNote(note.id);

  const items = [
    {
      label: "Edit",
      onClick: () => openModal(<NoteForm note={note} />, "!max-w-xl"),
    },
    {
      label: "Delete",
      destructive: true,
      onClick: () => {
        deleteNote(undefined, {
          onSuccess: () => {
            toast.success("Note deleted successfully");
          },
          onError: () => {
            toast.error("Failed to delete note");
          }
        });
      },
    },
  ];

  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-2xl border p-4",
        "border-amber-200/60 bg-[#FFFCF6] shadow-sm",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="line-clamp-1 text-base font-semibold text-amber-950">{note.title}</span>

          <ActionMenu triggerClassName="text-gray-600 hover:text-gray-900 hover:bg-gray-100" items={items} />
        </div>

        <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <span className="line-clamp-3 text-sm leading-relaxed text-amber-900/70">{note.body}</span>
      </div>
    </div>
  );
}
