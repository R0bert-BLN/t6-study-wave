import type { JSX } from "react";
import { z } from "zod";
import { useModal } from "@/providers/modal/use-modal.ts";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { InputField } from "@/components/elements/input-field.tsx";
import SubmitButton from "@/components/elements/submit-button.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FormProvider } from "@/providers/form/form-provider.tsx";
import { TextField } from "@/components/elements/text-field.tsx";
import type { Note } from "@/types/resources/note.ts";
import { useCreateNote, useUpdateNote } from "@/hooks/resources/note/use-note-mutation.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";

const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
});

interface NoteFormProps {
  note?: Note;
}

export default function NoteForm({ note }: NoteFormProps): JSX.Element {
  const { user } = useAuth();
  const { closeModal } = useModal();

  const { mutate: createNote, isPending: isCreating } = useCreateNote();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote(note?.id ?? "");

  const form = useForm({
    defaultValues: {
      title: note?.title ?? "",
      body: note?.body ?? "",
      category: note?.category ?? "",
    },
    validators: {
      onSubmit: createNoteSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        createdBy: user?.id ?? "",
      };

      if (note) {
        updateNote(payload, {
          onSuccess: () => {
            closeModal();
            toast.success("Note updated successfully");
          },
          onError: () => {
            toast.error("Error updating note");
          },
        });
      } else {
        createNote(payload, {
          onSuccess: () => {
            closeModal();
            toast.success("Note created successfully");
          },
          onError: () => {
            toast.error("Error creating note");
          },
        });
      }
    },
  });

  return (
    <FormProvider value={form}>
      <div className="flex flex-col gap-6">
        <div className="mb-2 text-left">
          <p className="text-xl font-bold tracking-tight text-zinc-900">
            {note ? "Edit Note" : "Create Note"}
          </p>
        </div>

        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <InputField name="title" label="Title" variant="default" className="mb-2" />
          <InputField name="category" label="Category" variant="default" className="mb-2" />
          <TextField name="body" label="Content" variant="default" />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={closeModal}
              variant="outline"
              className="cursor-pointer px-4 py-4.5 text-[13px] font-medium transition-all"
            >
              Cancel
            </Button>

            <SubmitButton
              isLoading={isCreating || isUpdating}
              label={note ? "Update Note" : "Create Note"}
              className="main-btn px-4"
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
