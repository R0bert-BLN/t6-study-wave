import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note, NotePayload } from "@/types/resources/note.ts";
import { noteService } from "@/servicies/resources/note.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NotePayload): Promise<Note> => noteService.create(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note] });
    },
  });
};

export const useUpdateNote = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<NotePayload>): Promise<Note> => noteService.update(id, data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note, id] });
    },
  });
};

export const useDeleteNote = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<void> => noteService.delete(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note] });
      queryClient.invalidateQueries({ queryKey: [ResourceType.Note, id] });
    },
  });
};
