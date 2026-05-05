import {
  type BaseQueryResult,
  type QueryParams,
  useBaseQuery,
} from "@/hooks/general/use-base-query.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { noteService } from "@/servicies/resources/note.ts";
import type { Note } from "@/types/resources/note.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNotes = (params: QueryParams): BaseQueryResult<Note> => {
  return useBaseQuery<Note>({
    queryKey: [ResourceType.Note],
    queryFn: (queryParams) => noteService.getAll(queryParams),
    params,
  });
};

export const useGetNoteById = (id: string) => {
  return useQuery({
    queryKey: [ResourceType.Note, id],
    queryFn: () => noteService.getById(id),
    enabled: !!id,
  });
};
