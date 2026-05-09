import { ResourceType } from "@/types/resources/resource-type.ts";
import { noteService } from "@/servicies/resources/note.ts";
import type { NoteGroup } from "@/types/resources/note.ts";
import { useQuery } from "@tanstack/react-query";
import {
  useBaseQuery,
  type BaseQueryResult,
  type QueryParams,
} from "@/hooks/general/use-base-query.ts";

export const useGetAllNotes = (params: QueryParams): BaseQueryResult<NoteGroup> => {
  return useBaseQuery<NoteGroup>({
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
