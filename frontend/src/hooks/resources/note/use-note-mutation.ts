import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/resources/note.ts";
import { noteService, type NoteCreatePayload } from "@/servicies/resources/note.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteCreatePayload): Promise<Note> => noteService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note] });
    },
  });
};

export const useUpdateNote = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Note>): Promise<Note> => noteService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note, id] });
    },
  });
};
