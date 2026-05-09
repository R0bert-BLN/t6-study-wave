import type { User } from "@/types/resources/user.ts";

export interface Note {
  id: string;
  title: string;
  body: string;
  createdBy: User;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteGroup {
  category: string;
  notes: Note[];
}

export interface NotePayload {
  title: string;
  body: string;
  createdBy: string;
  category: string;
}
