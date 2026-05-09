import type { Assignment } from "@/types/resources/assignment.ts";
import type { Material } from "@/types/resources/material.ts";
import type { Announcement } from "@/types/resources/announcement.ts";

// @ts-ignore
export enum FluxType {
  Assignment = "assignment",
  Material = "material",
  Announcement = "announcement",
}

export type FluxItem =
  | (Assignment & { type: FluxType.Assignment })
  | (Material & { type: FluxType.Material })
  | (Announcement & { type: FluxType.Announcement });

export type Flux = Record<string, FluxItem[]>;
