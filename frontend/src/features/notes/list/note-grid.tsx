import type { JSX } from "react";
import type { NoteGroup } from "@/types/resources/note.ts";
import { cn } from "@/lib/utils.ts";
import NoteCard from "@/components/elements/note-card.tsx";
import Accordion from "@/components/elements/accordion.tsx";

interface NotesGridProps {
  notes: NoteGroup[];
  className?: string;
}

export default function NotesGrid({ notes, className }: NotesGridProps): JSX.Element {
  const entries = notes.filter((group) => group.notes.length > 0);

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 py-20 text-zinc-400">
        <p className="text-[14px] font-medium">No notes found</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {entries.map((group, index) => {
        const categoryLabel = group.category.trim();

        return (
          <Accordion key={categoryLabel} title={categoryLabel} defaultOpen={index === 0}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {group.notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </Accordion>
        );
      })}
    </div>
  );
}
