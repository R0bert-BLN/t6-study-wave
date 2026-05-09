import { createFileRoute } from "@tanstack/react-router";
import { useModal } from "@/providers/modal/use-modal.ts";
import Header from "@/components/elements/header.tsx";
import type { JSX } from "react";
import { useGetAllNotes } from "@/hooks/resources/note/use-note-query.ts";
import NoteForm from "@/features/notes/create/note-form.tsx";
import SearchBar from "@/components/elements/search-bar.tsx";
import NotesGrid from "@/features/notes/list/note-grid.tsx";
import {useAuth} from "@/providers/auth/use-auth.ts";

export const Route = createFileRoute("/_app/notes/")({
  component: NotePage,
});

function NotePage(): JSX.Element {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { data: notes, filters } = useGetAllNotes({ size: -1, filters: { created_by: user?.id ?? "" } });

  return (
    <div className="main-container flex h-screen flex-col">
      <Header
        className="pb-10"
        title="Notes"
        subtitle="View and manage your notes"
        buttonText="Create Note"
        onButtonClick={() => openModal(<NoteForm />, "!max-w-xl")}
      />

      <div className="pb-10">
        <SearchBar className="w-full" onSearch={(value) => filters.setFilter("title", value)} />
      </div>

      <div className={"no-scrollbar flex-1 overflow-y-auto"}>
        <NotesGrid notes={notes ?? {}} />
      </div>
    </div>
  );
}
